import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelectors } from '../store/slices/userSlice';
import socket from '../utils/socket';

const useLogin = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.user);
  useEffect(() => {
    socket.on('user', (user) => {
      dispatch(userActions.setUser(user));
    });
  });
  return [user];
};

export default useLogin;
