import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist } from "../types/Wishlist";

interface WishlistState {
  wishlists: Wishlist[];
  selectedWishlistId: Wishlist['id'] | string | null;
  loading: boolean;

}

const initialState: WishlistState = {
  wishlists: [],
  selectedWishlistId: null,
  loading: false,
};

const wishlistSlice = createSlice({
  name: 'wishlists',
  initialState,
  reducers: {
    setWishlists(state, action: PayloadAction<Wishlist[]>) {
      state.wishlists = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSelectedWishlistId(state, action: PayloadAction<Wishlist['id'] | string | null>) {
      state.selectedWishlistId = action.payload;
    },
  },
});

export const { setWishlists, setLoading, setSelectedWishlistId } = wishlistSlice.actions;
export default wishlistSlice.reducer;