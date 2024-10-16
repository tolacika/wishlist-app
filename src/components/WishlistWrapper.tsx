import { useSelector } from "react-redux";
import Message from "./Message";
import { RootState } from "../store";
import { useMemo } from "react";
import { TWishlist } from "../types/Wishlist";
import WishlistHead from "./WishlistHead";

const WishlistWrapper = () => {
  const selectedWishlistId = useSelector((state: RootState) => state.wishlists.selectedWishlistId);
  const wishlists = useSelector((state: RootState) => state.wishlists.wishlists);
  const loading = useSelector((state: RootState) => state.wishlists.loading);
  const wishlist: TWishlist | undefined = useMemo(
    () => wishlists.find((wishlist) => wishlist.id === selectedWishlistId),
    [wishlists, selectedWishlistId]
  );


  if (loading) {
    return <Message>Loading...</Message>;
  }
  if (!selectedWishlistId || !wishlist) {
    if (wishlists.length) {
      return (
        <>
          <Message>Please select a wishlist.</Message>
          {wishlists.map((wishlist, index) => (
            <WishlistHead
              key={index}
              wishlist={wishlist}
              showItems={false}
            />
          ))} 
        </>
      );
    } else {
      return <Message>You have no wishlists yet.</Message>;
    }
  }

  return <WishlistHead wishlist={wishlist} />;
};

export default WishlistWrapper;