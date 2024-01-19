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
import userSliceReducer from './slices/userSlice';
import { ordersApi } from './services/ordersApi';


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
    [ordersApi.reducerPath]: ordersApi.reducer,
    shoppingCart: persistedReducer,
    user: userSliceReducer,
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
    ordersApi.middleware,
   
  ), 
})

export const persistor = persistStore(store);

setupListeners(store.dispatch)

export { setupListeners }

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

