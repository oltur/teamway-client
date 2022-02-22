import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';

test('renders a name', () => {
  const { getByText } = render(
    <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
  );

  expect(getByText(/teamway/i)).toBeInTheDocument();
});
