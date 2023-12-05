import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const fetchUserLogin = createAsyncThunk('/auth/fetchUserLogin', async(params) => {
  const {data} = await axios.post('/auth/login', params);
  return data;
});

export const fetchUserRegister = createAsyncThunk('/auth/fetchUserRegister', async(params) => {
  const {data} = await axios.post('/auth/register', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async() => {
  const {data} = await axios.get('/auth/me');
  console.log(data);
  return data;
});

const initialState = {
  data: null,
  modal: false,
  status: 'loading',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
    },
    modalOpen: state => {
      console.log("OPEN!")
      state.modal = true
    },
    modalClose: state => {
      state.modal = false
    }
  },
  extraReducers: {
    [fetchUserLogin.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchUserLogin.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchUserRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchUserRegister.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  }
});

export const modalSelector = state => {console.log(state.modal); return state.modal};
export const isAuthSelector = state => Boolean(state.auth.data);
export const roleSelector = state => state.auth.data;
export const {logout, modalOpen, modalClose} = authSlice.actions;

export default authSlice.reducer;