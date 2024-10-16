import Header from './components/Header';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useAuth } from './hooks/useAuth';
import { useEffect, useState } from 'react';
import { useFirestore } from './hooks/useFirestore';
import WishlistAddForm from './components/WishlistAddForm';
import Message from './components/Message';
import WishlistItemAddForm from './components/WishlistItemAddForm';
import WishlistWrapper from './components/WishlistWrapper';


const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false);

  const { handleLogin, handleLogout } = useAuth();
  const { fetchWishlists } = useFirestore();


  useEffect(() => {
    fetchWishlists(user.uid ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);



  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Header
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      <main className="flex-grow container mx-auto">
        {user.uid ? (
          <>
            <WishlistAddForm />
            <WishlistItemAddForm
              isOpen={isItemModalOpen}
              onClose={() => setIsItemModalOpen(false)}
            />
            {/* <h2 className="text-3xl font-bold mb-6 px-4">Welcome, {user.displayName}!</h2> */}
            <WishlistWrapper />
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
