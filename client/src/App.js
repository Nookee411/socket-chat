import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppTheme from './AppTheme';
import LogOut from './components/LogOut';
import AppRoutes from './Routes';
import { userActions, userSelectors } from './store/slices/userSlice';

function App() {
  const user = useSelector(userSelectors.user);
  const dispatch = useDispatch();
  dispatch(userActions.restoreUser());
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <BrowserRouter>
        {user.name && <LogOut />}
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
