import React, { useEffect, useState } from 'react';
import {
  Paper,
  TextField,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelectors } from '../store/slices/userSlice';
import UserController from '../controller/userController';
import useLogin from '../hooks/useLogin';

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
}));
const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPaasword] = useState('');
  const [user] = useLogin();
  const history = useHistory();

  useEffect(() => {
    console.log(user);
    if (user && user.name) history.push('/');
  }, [user]);
  const submitUserLogin = () => {
    UserController.loginUser(username, password);
  };
  return (
    <Paper className={classes.root}>
      <Typography variant="h3" gutterBottom align="center">
        Login
      </Typography>
      <TextField
        required
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        label="Password"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPaasword(e.target.value)}
      />
      <form className={classes.buttons}>
        <Button variant="contained" onClick={submitUserLogin}>
          Sign in
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            history.push('/register');
          }}
        >
          Go to Register
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
