import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../Features/Shop/shopSlice";
import counterReducer from "../Features/Counter/counterSlice";

export default configureStore({
    reducer: {
        shopReducer,
        counterReducer
    }
})