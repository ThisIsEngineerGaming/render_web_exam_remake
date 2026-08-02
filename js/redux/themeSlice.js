import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../entities/Cookies.js';

const initialState = {
  value: getCookie('theme') || 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.value = action.payload;
    },
    toggleTheme(state) {
      state.value = state.value === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

// selectors
export const selectTheme = (state) => state.theme.value;
