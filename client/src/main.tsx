
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store, setupListeners, persistor } from './redux/store.ts'; 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';


// Call the setupApiListeners function to set up API listeners
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
 
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>      
        <App />       
      </PersistGate>
    </Provider>
   </BrowserRouter>
     
);

