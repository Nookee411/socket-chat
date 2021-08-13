import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppTheme from './AppTheme';
import AppRoutes from './Routes';
import { userActions } from './store/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  dispatch(userActions.restoreUser());
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
