import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { NAMES } from '../../constants';

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
      Cookies.set(NAMES.userCookie, JSON.stringify(state));
    },
    restoreUser: (state, action) => {
      const user = JSON.parse(Cookies.get(NAMES.userCookie));
      console.log(user);
      if (!user || !user.name || !user.id) return;

      state.name = user.name;
      state.id = user.id;
    },
  },
});
const userActions = userSlice.actions;
const userSelectors = {
  user: (state) => state.user,
};

export { userActions, userSelectors };

export default userSlice;
