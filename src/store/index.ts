import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import wishlistReducer from './wishlistSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    wishlists: wishlistReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;