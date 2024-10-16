import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TWishlist, TWishlistItem } from "../types/Wishlist";

interface WishlistState {
  wishlists: TWishlist[];
  selectedWishlistId: TWishlist['id'] | string | null;
  loading: boolean;
  upsertWishlist: TWishlist | null;
  upsertWishlistModalOpen: boolean;
  upsertWishlistItem: TWishlistItem | null;
  upsertWishlistItemModalOpen: boolean;
}

const initialState: WishlistState = {
  wishlists: [],
  selectedWishlistId: null,
  loading: false,
  upsertWishlist: null,
  upsertWishlistModalOpen: false,
  upsertWishlistItem: null,
  upsertWishlistItemModalOpen: false,
};

const wishlistSlice = createSlice({
  name: 'wishlists',
  initialState,
  reducers: {
    setWishlists(state, action: PayloadAction<TWishlist[]>) {
      state.wishlists = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSelectedWishlistId(state, action: PayloadAction<TWishlist['id'] | string | null>) {
      state.selectedWishlistId = action.payload;
    },
    openUpsertWishlistModal(state, action: PayloadAction<TWishlist | null>) {
      state.upsertWishlistModalOpen = true;
      state.upsertWishlist = action.payload;
    },
    closeUpsertWishlistModal(state) {
      state.upsertWishlistModalOpen = false;
      state.upsertWishlist = null;
    },
    openUpsertWishlistItemModal(state, action: PayloadAction<TWishlistItem | null>) {
      state.upsertWishlistItemModalOpen = true;
      state.upsertWishlistItem = action.payload;
    },
    closeUpsertWishlistItemModal(state) {
      state.upsertWishlistItemModalOpen = false;
      state.upsertWishlistItem = null;
    },
  },
});

export const {
  setWishlists,
  setLoading,
  setSelectedWishlistId,
  openUpsertWishlistModal,
  closeUpsertWishlistModal,
  openUpsertWishlistItemModal,
  closeUpsertWishlistItemModal,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;