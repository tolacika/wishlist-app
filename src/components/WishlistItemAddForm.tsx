import { useState } from "react";
import { TWishlist } from "../types/Wishlist";
import { useDispatch } from "react-redux";


interface WishlistItemAddFormProps {
  isOpen?: boolean;
  onClose(): void;
  onSubmit?(newId: TWishlist['id']): void;
}


const WishlistItemAddForm = ({isOpen, onClose, onSubmit}: WishlistItemAddFormProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [links, setLinks] = useState<string[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    // Modal Wrapper
    <div className={`${isOpen ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center ">
        {/* Background Overlay */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" aria-hidden="true"
        />

        {/* Modal Content */}
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full mt-12">
          <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Create New Wishlist
            </h3>

            <div className="mt-4">
              <label htmlFor="title" className="block text-md font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="comment" className="block text-md font-medium text-gray-700">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="icon" className="block text-md font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="icon"
                id="icon"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
};

export default WishlistItemAddForm