import { addDoc, collection, DocumentData, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { db } from '../firebase/config'; 
import { setWishlists, setLoading } from '../store/wishlistSlice';
import { useDispatch } from 'react-redux';
import { Wishlist } from '../types/Wishlist';

const wishlistConverter = {
  toFirestore(wishlist: Wishlist): DocumentData {
    return {
      //id: wishlist.id ?? null,
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
  fromFirestore(snapshot: any, options: any): Wishlist {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
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

  const fetchWishlists = async (uid: string | null) => {
    if (!uid) {
      dispatch(setWishlists([]));
      return;
    }
  
    dispatch(setLoading(true));

    try {
      const wishlistsRef = collection(db, 'wishlists').withConverter(wishlistConverter);;
      const q = query(wishlistsRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const userWishlists = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(userWishlists);
      dispatch(setWishlists(userWishlists as Wishlist[]));
    } catch (error) {
      console.error("Error fetching user's wishlists: ", error);
    } finally {
      dispatch(setLoading(false));
    }

  };

  const addWishlist = async (data: Wishlist): Promise<Wishlist['id']> => {
    const wishlistsRef = collection(db, 'wishlists').withConverter(wishlistConverter);
    console.log(data, wishlistConverter.toFirestore(data));
    const newDoc = await addDoc(wishlistsRef, data);
    return newDoc.id;
  };

  
  
  return { fetchWishlists, addWishlist };
};