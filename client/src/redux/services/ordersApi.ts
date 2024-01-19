import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Order = {
_id: string,
created: string,
name: string,
email: string,
address: {
    city: string,
    country: string,
    street: string,
    street2: string | undefined,
    postal_code: string,
},
products: [{
    stripeId: string,
    description: string,
    quantity: number,
    image: string,
    price: number,
    currency: string,
    total: number,
}],
isShipped: false,
}


export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
      getPersonalOrders: builder.query<Order[], void>({
        query: () => ({
            url: '/orders/personal',
            credentials: 'include',
        })
         
      }),
    }),
  });


  export const { useGetPersonalOrdersQuery } = ordersApi;