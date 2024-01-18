import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type StripeProduct = {
  id: string;
  active: boolean;
  created: number;
  default_price: {
    id: string;
    active: boolean;
    currency: string;
    product: string;
    unit_amount: number;
    unit_amount_decimal: number;
  };
  // prices: [{
  //   unit_amount: number;
  //   unit_amount_decimal: number;
  // }];
  description: string;
  images: string;
  metadata: {
    category: string;
  };
  name: string;
};

export type StripeProducts = {
  object: string;
  data: StripeProduct[];
};

export type ProductInStock = {
    _id: string,
    title: string,
    stripeId: string,
    inStock: number
};

export type ProductsInStock = ProductInStock[];

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query<StripeProducts, void>({
      query: () => 'products',
    }),
    getProductById: builder.query<StripeProduct, string>({
      query: (productId) => `products/${productId}`,
    }),
    getQuantityInStock: builder.query<ProductsInStock, void>({
     query: () => 'dbproducts',   
    })
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetQuantityInStockQuery } = productsApi;


