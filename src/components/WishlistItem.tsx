import React from 'react';
import { Wishlist } from '../types/Wishlist';

interface WishlistItemProps {
  wishlist: Wishlist;
  isSelected: boolean;
  onClick?(): void;
}

const WishlistItem = ({ wishlist, isSelected, onClick }: WishlistItemProps) => {
  return (
    <div className="mb-4">
      <div
        onClick={onClick}
        className={`p-4 rounded-lg shadow-lg flex items-center justify-between cursor-pointer ${isSelected ? 'bg-blue-300 hover:bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'}`}>
        <i className="mr-2 fa-xl fa-solid fa-list-check"></i>
        <h3 className="text-xl font-bold w-full">{wishlist.title}</h3>
        <small
          className={`mx-2 px-2 py-1 rounded-lg ${
            wishlist.type === 'public'
              ? 'bg-green-200 text-green-800'
              : 'bg-red-200 text-red-800'
          }`}
        >
          {wishlist.type === 'public' ? 'Public' : 'Private'}
        </small>
        <i className={`fa-xl fa-solid fa-chevron-${isSelected ? 'up' : 'down'}`}></i>
      </div>
      <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isSelected ? 'max-h-40' : 'max-h-0'
        }`}>
        <div className="bg-black">
          Details
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
