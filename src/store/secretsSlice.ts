import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const storedSecrets = localStorage.getItem('stored_secrets');
const initialState: { [key: string]: string } = storedSecrets ? JSON.parse(storedSecrets) : {};

const secretsSlice = createSlice({
  name: 'secrets',
  initialState,
  reducers: {
    setSecret: (state, action: PayloadAction<{ documentId: string, secret: string }>) => {
      const { documentId, secret } = action.payload;
      state[documentId] = secret;
      localStorage.setItem('stored_secrets', JSON.stringify(state));
    },
    resetSecrets: (state) => {
      Object.keys(state).forEach(key => delete state[key]);
      localStorage.setItem('stored_secrets', JSON.stringify({}));
    }
  }
});

export const { setSecret, resetSecrets } = secretsSlice.actions;

export default secretsSlice.reducer;

export const selectSecretById = (state: { secrets: { [key: string]: string } }, documentId: string) => {
  return state.secrets[documentId];
};