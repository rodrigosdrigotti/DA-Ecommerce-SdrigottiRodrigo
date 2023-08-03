import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "User",
    initialState: {
        value: {
            email: "",
            idToken: "",
            localId: "",
            profileImage: "",
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        logOut: (state) => {
            state.value = {
                email: "",
                idToken: "",
                localId: "",
                profileImage: "",
            }
        },
        saveImage: (state, action) => {
            state.value.profileImage = action.payload
        }
    }
})

export const {setUser, logOut, saveImage} = userSlice.actions

export default userSlice.reducer