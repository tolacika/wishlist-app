import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { openUpsertWishlistModal, setSelectedWishlistId } from '../store/wishlistSlice';

interface HeaderProps {
  handleLogin(): void;
  handleLogout(): void;
}


const Header = ({ handleLogin, handleLogout }: HeaderProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const wishlists = useSelector((state: RootState) => state.wishlists);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleWishlistClick = (id?: string) => {
    dispatch(setSelectedWishlistId(id))
  };

  useEffect(() => {
    // Add or remove the 'overflow-hidden' class from body when dropdown is open
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Clean up by removing the class when component unmounts or isOpen changes
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  // Function to close the dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 bg-blue-600 z-50">
      <div className="md:container md:mx-auto">
        <nav className="w-full px-4 py-2 relative">
          <div className="flex justify-between items-center">
            <div
              onClick={() => handleWishlistClick()}
              className="text-white font-bold text-lg cursor-pointer"
            >
              Wishlist App
            </div>
            {user.uid ? (
              <button
                className="text-white bg-blue-500 px-2 py-2 rounded hover:bg-blue-400 focus:outline-none"
                onClick={() => !isOpen && setIsOpen(true)}
              >
                Wishlists
              </button>
            ) : (
              <button
                className="text-white bg-blue-500 px-2 py-2 rounded hover:bg-blue-400 focus:outline-none"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </div>

          {/* Dropdown Menu */}
          {user.uid ? (
            <div
              ref={dropdownRef}
              className={`absolute right-0 w-full sm:w-64 px-4 z-40 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
              <ul className="bg-white mt-2 py-2 shadow-lg rounded-lg">
                {/* Create New Wishlist */}
                <li className="border-b px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    onClick={(...e) => {
                      setIsOpen(false);
                      dispatch(openUpsertWishlistModal(null));
                    }}
                    className="w-full text-left">
                    Create New Wishlist
                  </button>
                </li>

                {/* Dynamic Wishlist Items */}
                {wishlists.wishlists.map((wishlist, index) => (
                  <li
                    key={index}
                    className="border-b px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <button
                      className="w-full text-left"
                      onClick={() => {
                        setIsOpen(false);
                        handleWishlistClick(wishlist.id);
                      }}
                    >
                      {wishlist.title}
                    </button>
                  </li>
                ))}

                {/* Logout Button */}
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : <></>}
        </nav>
      </div>
    </header>
  );
};

export default Header;