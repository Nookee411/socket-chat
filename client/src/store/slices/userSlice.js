import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    id: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      if (!payload || !payload.name || !payload.id) return;
      state.name = payload.name;
      state.id = payload.id;
    },
    initUser: (state) => {
      const user = localStorage.getItem('user');
      if (user) state = user;
    },
  },
});
const userActions = userSlice.actions;
const userSelectors = {
  user: (state) => state.user,
};

export { userActions, userSelectors };

export default userSlice;
