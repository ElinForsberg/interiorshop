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
            body: userData,
          }),
      })
    }),
  });
  
  export const { useRegisterUserMutation, useLoginUserMutation } = usersApi;
  