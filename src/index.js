import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './components/App';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({});

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
