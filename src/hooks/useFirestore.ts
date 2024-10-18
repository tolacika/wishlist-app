import { addDoc, collection, doc, DocumentData, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { setWishlists, setLoading } from '../store/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TEncryptedWishlist, TWishlist } from '../types/Wishlist';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import CryptoJs from 'crypto-js';
import { selectSecretById } from '../store/secretsSlice';
import { RootState } from '../store';
import { useCallback } from 'react';

const wishlistConverter = {
  toFirestore(wishlist: TWishlist | TEncryptedWishlist): DocumentData {
    return {
      nonce: wishlist.nonce ?? null,
      uid: wishlist.uid,
      icon: wishlist.icon,
      type: wishlist.type,
      createdAt: Timestamp.fromDate(new Date(wishlist.createdAt)),
      updatedAt: Timestamp.fromDate(new Date(wishlist.updatedAt)),
      data: typeof wishlist.data === 'string' ? wishlist.data : {
        title: wishlist.data.title,
        comment: wishlist.data.comment,
        items: wishlist.data.items?.map((item) => ({
          name: item.name,
          description: item.description,
          imageUrl: item.imageUrl,
          links: item.links,
          position: item.position,
          createdAt: Timestamp.fromDate(new Date(item.createdAt)),
          updatedAt: Timestamp.fromDate(new Date(item.updatedAt)),
        })),
      },
    };
  },
  fromFirestore(snapshot: any, options: any): TWishlist | TEncryptedWishlist {
    const docData = snapshot.data(options);

    return {
      id: snapshot.id,
      nonce: docData.nonce,
      uid: docData.uid,
      icon: docData.icon,
      type: docData.type,
      createdAt: (docData.createdAt as Timestamp).toDate().toISOString(),
      updatedAt: (docData.updatedAt as Timestamp).toDate().toISOString(),
      data: typeof docData.data === 'string' ? docData.data : {
        title: docData.data.title,
        comment: docData.data.comment,
        items: docData.data.items.map((item: any) => ({
          name: item.name,
          description: item.description,
          imageUrl: item.imageUrl,
          links: item.links,
          position: item.position,
          createdAt: (item.createdAt as Timestamp).toDate().toISOString(),
          updatedAt: (item.updatedAt as Timestamp).toDate().toISOString(),
        })),
      }
    }
  }
};

export const useFirestore = () => {
  const dispatch = useDispatch();
  const secrets = useSelector((state: RootState) => state.secrets);

  const encryptData = (data: TWishlist['data'], secretKey: Uint8Array): { encryptedData: string, nonce: string } => {
    const nonce = nacl.randomBytes(24); // Generate random nonce
    const messageUint8 = naclUtil.decodeUTF8(JSON.stringify(data));
    const encrypted = nacl.secretbox(messageUint8, nonce, secretKey);

    return {
      encryptedData: naclUtil.encodeBase64(encrypted),
      nonce: naclUtil.encodeBase64(nonce) // Return nonce in hex format
    };
  };

  const decryptData = (encryptedData: string, nonce: string, secretKey: Uint8Array): TWishlist['data'] | null => {
    const message = naclUtil.decodeBase64(encryptedData);
    const nonceUint8 = naclUtil.decodeBase64(nonce);
    const decrypted = nacl.secretbox.open(message, nonceUint8, secretKey);

    if (!decrypted) {
      console.error('Failed to decrypt data');
      return null;
    }

    return JSON.parse(naclUtil.encodeUTF8(decrypted));
  };

  const hashSecret = (secret: string): string => {
    const hash = CryptoJs.SHA256(secret);
    return hash.toString(CryptoJs.enc.Base64);
  };


  const fetchWishlists = useCallback(async (uid: string | null) => {
    if (!uid) {
      dispatch(setWishlists([]));
      return;
    }

    dispatch(setLoading(true));

    try {
      const wishlistsRef = collection(db, 'wishlists').withConverter(wishlistConverter);
      const q = query(wishlistsRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const userWishlists = querySnapshot.docs.map((doc) => {
        const docData = {
          id: doc.id,
          ...doc.data(),
        };

        if (docData.type === 'secret' && typeof docData.data === 'string') {
          const secret = selectSecretById({ secrets }, docData.id);

          const secretHash = hashSecret(secret);
          const secretKey = naclUtil.decodeBase64(secretHash);
          const data = decryptData(docData.data , docData.nonce!, secretKey);
          docData.data = data!;
        }

        return docData;
      });

      dispatch(setWishlists(userWishlists as TWishlist[]));
    } catch (error) {
      console.error("Error fetching user's wishlists: ", error);
    } finally {
      dispatch(setLoading(false));
    }

  }, [dispatch, secrets]);

  const addWishlist = useCallback(async (data: TWishlist): Promise<TWishlist['id']> => {

    if (data.type === 'secret') {
      data.type = 'private';
    }

    const wishlistsRef = collection(db, 'wishlists').withConverter(wishlistConverter);

    const newDoc = await addDoc(wishlistsRef, data);

    return newDoc.id;
  }, []);


  const updateWishlist = useCallback(async (wishlist: TWishlist): Promise<TWishlist['id']> => {
    const { id, ...data }: TWishlist | TEncryptedWishlist = wishlist;

    if (data.type === 'secret') {
      //const secret = useSelector((state: RootState) => selectSecretById(state, wishlist.id!));
      const secret = selectSecretById({ secrets }, wishlist.id!);
      if (!secret) {
        console.error('Secret not found', { secret, id: wishlist.id });
      } else {
        const secretHash = hashSecret(secret);
        const secretKey = naclUtil.decodeBase64(secretHash);

        const encrypted = encryptData(wishlist.data, secretKey);

        data.data = encrypted.encryptedData;
        data.nonce = encrypted.nonce;
      }
    }

    console.log({ data });

    const wishlistsRef = doc(db, 'wishlists', id!).withConverter(wishlistConverter);

    await setDoc(wishlistsRef, data)

    return id;
  }, [secrets]);

  return { fetchWishlists, addWishlist, updateWishlist };
};