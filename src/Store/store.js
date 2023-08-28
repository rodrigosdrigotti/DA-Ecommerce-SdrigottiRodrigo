import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import shopReducer from "../Features/Shop/shopSlice";
import counterReducer from "../Features/Counter/counterSlice";
import cartReducer from "../Features/Cart/cartSlice";
import userReducer from "../Features/User/userSlice";
import orderReducer from "../Features/Order/orderSlice"
import themeReducer from "../Features/Theme/themeSlice"
import { shopApi } from "../Services/shopServices";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../Services/authServices";

const store = configureStore({
    reducer: {
        shopReducer,
        counterReducer,
        cartReducer,
        userReducer,
        orderReducer,
        themeReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
})

setupListeners(store.dispatch);

export default store;
