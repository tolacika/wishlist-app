import { TWishlist, TWishlistItem } from '../types/Wishlist';
import WishlistItem from './WishlistItem';
import { openUpsertWishlistModal, setSelectedWishlistId } from '../store/wishlistSlice';
import { useDispatch } from 'react-redux';

interface WishlistHeadProps {
  wishlist: TWishlist;
  showItems?: boolean;
}

const WishlistHead = ({ wishlist, showItems = true }: WishlistHeadProps) => {
  const dispatch = useDispatch();

  return (
      <div
        className={`wishlist-head ${!showItems ? 'cursor-pointer' : ''}`}
        onClick={() => !showItems && dispatch(setSelectedWishlistId(wishlist.id))}
      >
        <div className='flex m-2 bg-white rounded-xl items-start'>
          <div>
            <div className='bg-slate-300 text-slate-800 p-4 rounded-xl mr-4 w-6 box-content text-center'>
              <i className={`fa-xl fa-solid fa-${wishlist.icon || 'list-check'}`}></i>
            </div>
          </div>
          <div className='flex-grow'>
            <p className='text-xl font-bold'>{wishlist.title}</p>
            <p>{wishlist.comment}</p>
          </div>
          <div>
            <small className={`mt-4 mr-2 px-2 py-1 rounded-lg ${wishlist.type === 'public' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {wishlist.type === 'public' ? 'Public' : 'Private'}
            </small>
          </div>
          <div
            className='p-4 rounded-xl ml-4 w-6 box-content text-center text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-slate-400'
            onClick={() => dispatch(openUpsertWishlistModal(wishlist))}
          >
            <i className="fa-xl fa-solid fa-pen"></i>
          </div>
        </div>
        {showItems && (
          <div className='grid grid-cols-1 gap-2 m-2'>
            {wishlist.items.map((item: TWishlistItem, index: number) => (
              <WishlistItem key={index} wishlistItem={item} />
            ))}
            <div
              className="bg-white text-slate-300 rounded-xl cursor-pointer text-center p-6"
            >
              <i className='fa-2xl fa-solid falid fa-plus'></i>
            </div>
          </div>
        )}
      </div>
  )
};


export default WishlistHead;
