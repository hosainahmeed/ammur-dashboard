import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import { Routes } from './Routes/Routes.jsx';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import { Toaster } from 'react-hot-toast';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
      <RouterProvider router={Routes} />
    </Provider>
  </StrictMode>
);
