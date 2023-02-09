import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'simplebar/dist/simplebar.min.css'
import 'react-toastify/dist/ReactToastify.css';

import './fonts/Roboto-Bold.ttf'; 
import './fonts/Electrolize-Regular.ttf'

import Paper from '@mui/material/Paper'

import { ThemeProvider } from '@mui/material/styles'
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';

//#region --------------[ States ]--------------
import AuthState from './context/auth_context/AuthState';
import StoryState from './context/story_context/StoryState';
// #endregion
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <Paper>
            <AuthState>
                <StoryState> 
                    <App />
                </StoryState>
            </AuthState>
        </Paper>
      </ThemeProvider>
  </React.StrictMode>
);

