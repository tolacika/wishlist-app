import { useMemo } from 'react';
import { Wishlist } from '../types/Wishlist';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Message from './Message';

interface WishlistHeadProps {
  selectedWishlistId?: Wishlist['id'] | string | null;
}

const WishlistHead = ({selectedWishlistId}: WishlistHeadProps) => {
  const wishlists = useSelector((state: RootState) => state.wishlists.wishlists);
  const loading = useSelector((state: RootState) => state.wishlists.loading);
  const wishlist = useMemo(
    () => wishlists.find((wishlist) => wishlist.id === selectedWishlistId),
    [wishlists, selectedWishlistId]
  );


  if (loading) {
    return <Message>Loading...</Message>;
  }
  if (!selectedWishlistId) {
    return <Message>No selected wishlist</Message>
  }


  return (
      <div className="wishlist-Head">
        <div className='flex m-4 bg-white rounded-xl items-start'>
          <div>
            <div className='bg-slate-300 text-slate-800 p-4 rounded-xl mr-4'>
              <i className={`fa-xl fa-solid fa-${wishlist?.icon || 'list-check'}`}></i>
            </div>
          </div>
          <div className='flex-grow'>
            <p className='text-xl font-bold'>{wishlist?.title}</p>
            <p>{wishlist?.comment}</p>
          </div>
          <div>
            <small className={` mr-2 px-2 py-1 rounded-lg ${wishlist?.type === 'public' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {wishlist?.type === 'public' ? 'Public' : 'Private'}
            </small>
          </div>
        </div>
      </div>
  )
};


export default WishlistHead;
