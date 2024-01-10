import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from './services/products'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from './services/users'


export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
    productsApi.middleware,
    usersApi.middleware
  ),
 
})


setupListeners(store.dispatch)

export { setupListeners }
