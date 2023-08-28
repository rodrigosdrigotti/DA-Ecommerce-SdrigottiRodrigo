import { createSlice } from "@reduxjs/toolkit";

export const  themeSlice = createSlice({
    name: "Theme",
    initialState: {
        mode: "light"
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        }
    }
})

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;