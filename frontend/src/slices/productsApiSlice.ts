import { PRODUCTS_URL } from "../constants";
import { Product } from "../utils/types/product_Type";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all products
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    // Fetch a single product by ID
    getSingleProduct: builder.query<Product, string>({
      query: (productid:string) => ({
        url: `${PRODUCTS_URL}/${productid}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApiSlice;
