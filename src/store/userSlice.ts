import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  loading?: boolean;
}

const initialState: UserState = {
  uid: null,
  displayName: null,
  email: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearUser(state) {
      state.uid = null;
      state.displayName = null;
      state.email = null;
    },
  },
});

export const { setUser, setLoading, clearUser } = userSlice.actions;
export default userSlice.reducer;
