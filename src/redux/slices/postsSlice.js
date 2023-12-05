import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
  const {data} = await axios.get('/posts');
  return data.posts;
});

export const fetchCategories = createAsyncThunk('posts/fetchCategories', async() => {
  const {data} = await axios.get('/categories');
  return data.categories;
});


const initialState = {
  posts: {
    items: [],
    status: 'loading'
  },
  categories: {
    items: [],
    status: 'loading'
  },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchCategories.pending]: (state) => {
      state.categories.status = 'loading';
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories.items = action.payload;
      state.categories.status = 'loaded';
    },
    [fetchCategories.rejected]: (state) => {
      state.categories.items = [];
      state.categories.status = 'error';
    },
  }
})


export default postsSlice.reducer;