import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/slices/userSlice';

function LogOut() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };
  return (
    <Button variant="contained" onClick={handleLogout}>
      Log out
    </Button>
  );
}

export default LogOut;
