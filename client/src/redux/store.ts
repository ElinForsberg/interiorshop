import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from './services/productsApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { usersApi } from './services/usersApi'
import shoppingCartReducer from './slices/shoppingCartSlice';
import { checkoutApi } from './services/checkoutApi';

// Define persist config
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['shoppingCart'], 
  // Specify the slices you want to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, shoppingCartReducer);

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    shoppingCart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
}).concat(
    productsApi.middleware,
    usersApi.middleware,
    checkoutApi.middleware,
  ), 
})

export const persistor = persistStore(store);

setupListeners(store.dispatch)

export { setupListeners }

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;