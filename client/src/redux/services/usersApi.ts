import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type User = {
    _id: string,
    stripeId: string,
    email: string,
    name: string,
    password: string,
    isAdmin: boolean,
}
export type RegisterUser = {
    email: string,
    name: string,
    password: string
}
export type LoginUser = {
    email: string,
    password: string
}
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/user' }),
    endpoints: (builder) => ({
      registerUser: builder.mutation<User, Partial<RegisterUser>>({
        query: (userData) => ({
          url: 'register',
          method: 'POST',
          body: userData,
        }),
      }),
      loginUser: builder.mutation<User, Partial<LoginUser>>({
        query: (userData) => ({
            url: 'login',
            method: 'POST',
            credentials: 'include',
            body: userData,
          }),
      }),
      logoutUser: builder.mutation<void, void>({
        query: () => ({
            url: 'logout',
            method: 'POST',
            credentials: 'include',
        })
      }),
      authentication: builder.query<User, void>({
        query: () => ({
            url: '/authorize',
            credentials: 'include',
        })      
      })
    }),
  });
  
  export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useAuthenticationQuery } = usersApi;
  
  