import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ShoppingCartItem } from '../slices/shoppingCartSlice';
import { Order } from './ordersApi';

//create checkout and verify pament in Stripe
export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<{ url: string, sessionId: string }, ShoppingCartItem[]>({
      query: (cart) => ({
        url: '/create-checkout-session',
        method: 'POST',
        credentials: 'include',
        body: cart, 
      }),
    }),
    verifyPayment: builder.mutation<{ verified: boolean; order?: Order }, { sessionId: string }>({
        query: ({sessionId}) => ({
            url: '/verifySession',
            method: 'POST',
            body: {sessionId}
        })
    })
  }),
});

export const { useCreateCheckoutSessionMutation, useVerifyPaymentMutation } = checkoutApi;


