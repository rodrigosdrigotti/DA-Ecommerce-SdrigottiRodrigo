import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: 'Order',
    initialState: {
        value: {
            userSelected: "",
            orders: [],
            ordersUserSelected: [],
        }
    },
    reducers: {
        setUserSelected: (state, action) => {
            state.value.ordersUserSelected = state.value.orders.filter(order => order.user === action.payload)
            state.value.userSelected = action.payload;
        },
        setAllOrders: (state, action) => {
            state.value.orders = action.payload;
        },
    }
})

export const { setUserSelected, setAllOrders } = orderSlice.actions;

export default orderSlice.reducer;