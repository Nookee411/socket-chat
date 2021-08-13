/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import {
  Paper,
  TextField,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { userActions } from '../store/slices/userSlice';
import MessageController from '../controller/messageController';
import UserController from '../controller/userController';
import { LINKS } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.black.tertiary,
    borderRadius: theme.spacing(4),
    border: `1px solid ${theme.palette.white.tertiary}`,
    padding: theme.spacing(5),
    maxWidth: '30em',
    margin: '0 auto',
    '& .MuiTypography-root': {
      color: theme.palette.white.secondary,
    },
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(4),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(5),
  },

  error: {
    display: 'flex',
    gap: theme.spacing(2),
    '& .MuiSvgIcon-root': {
      color: theme.palette.alert.primary,
    },
    '& .MuiTypography-root': {
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    marginBottom: theme.spacing(2),
  },
}));
const Register = () => {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const submitUserSignUp = () => {
    if (password.length < 3) {
      setError('Password is too short');
      return;
    }
    if (login.length < 3) {
      setError('Username is too short');
      return;
    }
    if (password === passwordConfirm) {
      UserController.registerUser(login, password);
    } else setError("Passwords doesn't match");
  };

  const handleUsernameInput = async (e) => {
    const username = e.target.value;
    setLogin(username);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h3" gutterBottom align="center">
        Registration
      </Typography>
      <TextField
        required
        label="Username"
        fullWidth
        value={login}
        onChange={handleUsernameInput}
      />
      <TextField
        required
        label="Password"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        required
        label="Confirm password"
        fullWidth
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      {error !== '' && (
        <div className={classes.error}>
          <ErrorIcon />
          <Typography variant="body2" gutterBottom>
            {error}
          </Typography>
        </div>
      )}
      <div className={classes.buttons}>
        <Button variant="contained" onClick={submitUserSignUp}>
          Register
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push(LINKS.login)}
        >
          Go to Login
        </Button>
      </div>
    </Paper>
  );
};

export default Register;
