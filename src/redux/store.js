import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import postsReducer from './slices/postsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    auth: authReducer,
  },
});

