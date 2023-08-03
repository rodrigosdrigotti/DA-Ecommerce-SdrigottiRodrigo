import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "Cart",
    initialState: {
        value: {
            user: "Hardcoder user",
            updatedAt: "",
            total: null,
            totalQuantity: null,
            items: []
        }
    },
    reducers: {
        addCartItem: (state, action) => {
            //1. Check productExists
            const productExists = state.value.items.some(item => item.id === action.payload.id)

            //2. Distinct logic if exists product or not
            if (productExists) {
                state.value.items = state.value.items.map(item => {
                    if (item.id === action.payload.id) {
                        item.quantity += action.payload.quantity
                        return item
                    }
                    return item
                })
            } else state.value.items.push(action.payload)

            //3. Update total Quantity
            let totalQuantity = 0;
            state.value.items.forEach((item) => {
                totalQuantity += item.quantity  
            });
            state.value.totalQuantity = totalQuantity;

            //4. Update total
            state.value.total = state.value.items.reduce(
                (acc, currentItem) => acc += currentItem.price * currentItem.quantity,
                0
            )

            //5. Update updatedAt
            state.value.updatedAt = new Date().toLocaleString()
        },
        removeCartItem: (state,action) => {
            //1. Remove item
            const itemId = action.payload;
            state.value.items = state.value.items.filter((item) => item.id !== itemId);

            //2. Update total Quantity
            let totalQuantity = 0;

            state.value.items.forEach((item) => {
                totalQuantity += item.quantity  
            });
            if(totalQuantity === 0){
                state.value.totalQuantity = null
            } else{
                state.value.totalQuantity = totalQuantity;
            }

            //3. Update total
            state.value.total = state.value.items.reduce(
                (acc, currentItem) => acc += currentItem.price * currentItem.quantity,
                0
            )

            //4. Update updatedAt
            state.value.updatedAt = new Date().toLocaleString()
        },
        clearCart: (state) => { 
            state.value = {
                user: "Hardcoder user",
                updatedAt: "",
                total: null,
                totalQuantity: null,
                items: []
            }
        }
    }
})

export const {addCartItem, removeCartItem, clearCart} = cartSlice.actions

export default cartSlice.reducer