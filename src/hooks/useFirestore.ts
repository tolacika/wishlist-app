import { addDoc, collection, doc, DocumentData, getDocs, query, setDoc, Timestamp,  where } from 'firebase/firestore';
import { db } from '../firebase/config'; 
import { setWishlists, setLoading } from '../store/wishlistSlice';
import { useDispatch } from 'react-redux';
import { TWishlist } from '../types/Wishlist';
//import useSecrets from './useSecrets';
//import CryptoJs from 'crypto-js';

const wishlistConverter = {
  toFirestore(wishlist: TWishlist): DocumentData {
    return {
      //id: wishlist.id ?? null,
      //iv: wishlist.iv ?? null,
      uid: wishlist.uid,
      title: wishlist.title,
      comment: wishlist.comment,
      icon: wishlist.icon,
      type: wishlist.type,
      createdAt: Timestamp.fromDate(new Date(wishlist.createdAt)),
      updatedAt: Timestamp.fromDate(new Date(wishlist.updatedAt)),
      items: wishlist.items.map((item) => ({
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        links: item.links,
        position: item.position,
        createdAt: Timestamp.fromDate(new Date(item.createdAt)),
        updatedAt: Timestamp.fromDate(new Date(item.updatedAt)),
      })),
    };
  },
  fromFirestore(snapshot: any, options: any): TWishlist {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      //iv: data.iv,
      uid: data.uid,
      title: data.title,
      comment: data.comment,
      icon: data.icon,
      type: data.type,
      createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
      updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
      items: data.items.map((item: any) => ({
        name: item.name,
        description: item.description,
        imageUrl:item.imageUrl,
        links: item.links,
        position: item.position,
        createdAt: (item.createdAt as Timestamp).toDate().toISOString(),
        updatedAt: (item.updatedAt as Timestamp).toDate().toISOString(),
      })),
    }
  }
};

export const useFirestore = () => {
  const dispatch = useDispatch();
  /*const {getSecret} = useSecrets();

  const getIv = (iv?: string): CryptoJs.lib.WordArray => iv ? CryptoJs.enc.Hex.parse(iv) : CryptoJs.lib.WordArray.random(16);

  const encryptData = (data: string | object, secret: string, iv: CryptoJs.lib.WordArray) => {
    return CryptoJs.AES.encrypt(JSON.stringify(data), secret, { iv }).toString();
  }

  const decryptData = (encryptedData: string, secret: string, iv: CryptoJs.lib.WordArray) => {
    const bytes = CryptoJs.AES.decrypt(encryptedData, secret, { iv });
    return JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
  }*/

  const fetchWishlists = async (uid: string | null) => {
    if (!uid) {
      dispatch(setWishlists([]));
      return;
    }
  
    dispatch(setLoading(true));

    try {
      const wishlistsRef = collection(db, 'wishlists').withConverter(wishlistConverter);
      const q = query(wishlistsRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const userWishlists = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
        /*.map(doc => {
          if (doc.type === 'secret') {
            const secret = getSecret(doc.id);
            const iv = getIv(doc.iv);
            if (secret && iv) {
              return {
                ...doc,
                title: decryptData(doc.title, secret, iv),
                comment: decryptData(doc.comment, secret, iv),
              };
            }
          }
          return doc;
        })*/;

      
      dispatch(setWishlists(userWishlists as TWishlist[]));
    } catch (error) {
      console.error("Error fetching user's wishlists: ", error);
    } finally {
      dispatch(setLoading(false));
    }

  };

  const addWishlist = async (data: TWishlist): Promise<TWishlist['id']> => {
    const wishlistsRef = collection(db, 'wishlists').withConverter(wishlistConverter);

    const newDoc = await addDoc(wishlistsRef, data);

    return newDoc.id;
  };

  const updateWishlist = async (wishlist: TWishlist): Promise<TWishlist['id']> => {
    const {id, ...data} = wishlist;

    /*if (wishlist.type === 'secret') {
      const secret = getSecret(wishlist.id!);
      const iv = getIv(wishlist.iv);
      if (secret) {
        data.iv = iv.toString(CryptoJs.enc.Hex);
        data.title = encryptData(data.title, wishlist.id!, iv);
        data.comment = encryptData(data.comment, wishlist.id!, iv);
      }
    }*/

    const wishlistsRef = doc(db, 'wishlists', id!).withConverter(wishlistConverter);

    await setDoc(wishlistsRef, data)

    return id;
  };
  
  return { fetchWishlists, addWishlist, updateWishlist };
};