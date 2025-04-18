import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Countdown from './components/Countdown';
import { HashRouter, Route, Routes } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: '"Sono", sans-serif',
    h1: {
      fontFamily: '"Sono", sans-serif',
    },
    h2: {
      fontFamily: '"Sono", sans-serif',
    },
  },
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path="*" element={<Countdown />} />
        </Routes>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode >,
);
