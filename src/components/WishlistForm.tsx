import { useState } from 'react';
import { Wishlist } from '../types/Wishlist';
import { useFirestore } from '../hooks/useFirestore';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

interface WishlistAddFormProps {
  isOpen?: boolean;
  onClose(): void;
  onSubmit?(newId: Wishlist['id']): void;
}

const WishlistAddForm = ({ onSubmit, onClose, isOpen = false }: WishlistAddFormProps) => {
  const user = useSelector((state: RootState) => state.user);
  const { addWishlist } = useFirestore();
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [icon, setIcon] = useState('');
  const [type, setType] = useState<Wishlist['type']>("private");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newWishlist: Wishlist = {
      uid: user.uid!,
      title,
      comment,
      icon,
      type,
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString(),
      items: [],
    };
    const newId = await addWishlist(newWishlist);
    console.log({ newId });
    onSubmit && onSubmit(newId);
    setTitle('');
    setComment('');
    setIcon('');
    setType('private');
    onClose();
  };

  return (
    // Modal Wrapper
    <div className={`${isOpen ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background Overlay */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" aria-hidden="true"
        />

        {/* Modal Content */}
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Create New Wishlist
            </h3>

            <div className="mt-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            {/* Other form fields (comment, icon, type) */}
            {/* ... */}

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-span-2 sm:w-auto"
              >
                Create
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-span-2 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // eslint-disable-next-line no-unreachable
  return (
    
    <div>
      <div
        className={`p-4 rounded-lg shadow-lg mb-4 flex items-center justify-between cursor-pointer`}>
        <i className="mr-2 fa-xl fa-solid fa-plus"></i>
        <h3 className="text-xl font-bold w-full">Create Wishlist</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Icon (URL or Emoji)"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as Wishlist['type'])}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Save Wishlist
        </button>
      </form>
    </div>
  );
};

export default WishlistAddForm;
