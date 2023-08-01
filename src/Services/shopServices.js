import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../Database/firebaseConfig";

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProducts: builder.query({
            query: () => `products.json`
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const productsTransformed = Object.values(response);
                return(productsTransformed)
            }
        }),
        getProductsById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const productsTransformed = Object.values(response).pop();
                return(productsTransformed)
            }
        }),
        postCart: builder.mutation({
            query: (order) => ({
                url: `orders.json`,
                method: `POST`,
                body: order
            })
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useGetProductsQuery,
    useGetProductsByIdQuery,
    useGetProductsByCategoryQuery,
    usePostCartMutation,
} = shopApi;