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
    setUser: (state, { payload: { success, data } }) => {
      if (!success) return;
      state.name = data.name;
      state.id = data.id;
      Cookies.set(NAMES.userCookie, JSON.stringify(state));
    },
    restoreUser: (state, action) => {
      const cookie = Cookies.get(NAMES.userCookie);
      if (!cookie) return;
      const user = JSON.parse(cookie);
      console.log(user);
      if (!user || !user.name || !user.id) return;

      state.name = user.name;
      state.id = user.id;
    },
    logoutUser: (state, action) => {
      Cookies.remove(NAMES.userCookie);
      state.name = null;
      state.id = null;
    },
  },
});
const userActions = userSlice.actions;
const userSelectors = {
  user: (state) => state.user,
};

export { userActions, userSelectors };

export default userSlice;
