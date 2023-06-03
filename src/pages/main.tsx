import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from '@firebase/app';
import firebaseConfig from '../firebase-config';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';

initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', async () => {
  const auth = getAuth();

  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = 'login/';
      return;
    }
    // console.log(user);

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
});
