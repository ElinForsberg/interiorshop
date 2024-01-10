import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store, setupListeners } from './store.ts'; // Import the setupApiListeners function
import { Provider } from 'react-redux';


// Call the setupApiListeners function to set up API listeners
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

