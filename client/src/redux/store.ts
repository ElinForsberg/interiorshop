import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from './services/productsApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from './services/usersApi'


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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;