import WishlistHead from './components/WishlistHead';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { useAuth } from './hooks/useAuth';
import { useEffect, useState } from 'react';
import { useFirestore } from './hooks/useFirestore';
import WishlistAddForm from './components/WishlistForm';
import { setSelectedWishlistId } from './store/wishlistSlice';
import Message from './components/Message';


const App = () => {
  const dispatch = useDispatch();
  
  const user = useSelector((state: RootState) => state.user);
  const selectedWishlistId = useSelector((state: RootState) => state.wishlists.selectedWishlistId);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { handleLogin, handleLogout } = useAuth();
  const { fetchWishlists } = useFirestore();


  useEffect(() => {
    fetchWishlists(user.uid ?? null);
  }, [fetchWishlists, user]);

  const handleCreateWishlist = () => {
    setIsModalOpen(true);
  };

  const handleWishlistClick = (id: string) => {
    dispatch(setSelectedWishlistId(id))
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Header
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        handleCreateWishlist={handleCreateWishlist}
        handleWishlistClick={handleWishlistClick}
      />

      <main className="flex-grow container mx-auto">
        {user.uid ? (
          <>
            <WishlistAddForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            {/* <h2 className="text-3xl font-bold mb-6 px-4">Welcome, {user.displayName}!</h2> */}
            <WishlistHead
              selectedWishlistId={selectedWishlistId ?? null}
            />
          </>
        ) : <Message>Please log in to manage your wishlists.</Message>}
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Wishlist App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
