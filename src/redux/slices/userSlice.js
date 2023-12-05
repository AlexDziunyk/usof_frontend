import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setLoginAction: (state, action) => {
      state.user = action.payload;
    },
    setLogoutAction: (state) => {
      state.user = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoginAction, setLogoutAction } = userSlice.actions;
export const getUser = (state) => state.user.user;
export default userSlice.reducer;