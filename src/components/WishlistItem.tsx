import { TWishlistItem } from '../types/Wishlist';

interface WishlistItemProps {
  wishlistItem: TWishlistItem;
}

const WishlistItem = ({ wishlistItem }: WishlistItemProps) => {
  return (
    <div className="mb-2 bg-white rounded-xl">
      <p>
        {wishlistItem.name}
      </p>
    </div>
  );
};

export default WishlistItem;
