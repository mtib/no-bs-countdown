import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Countdown from './components/Countdown';
import { HashRouter, Route, Routes } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8f5aa5', // Deeper purple
      light: '#ae52d4',
      dark: '#4f3072',
    },
    secondary: {
      main: '#6f3de8', // Adjusted purple accent
      light: '#a271ff',
      dark: '#3d1db5',
    },
    background: {
      default: '#0a0415', // Very dark purple background
      paper: '#160826', // Darker deep purple for paper elements
    },
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
