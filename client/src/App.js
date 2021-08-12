import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import AppTheme from './AppTheme';
import AppRoutes from './Routes';

function App() {
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
