import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// Configure the baseQuery
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Define your API slice
export const apiSlice = createApi({
     // Unique key for the API reducer
    reducerPath: "api",
     // Base query setup
    baseQuery,    
     // Tags for caching and invalidation     
    tagTypes: ["Product", "Order", "User"],
    endpoints: (builder) => ({}),
});
