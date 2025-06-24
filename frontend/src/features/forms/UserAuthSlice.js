import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showUserAuthForm: false,
    isUserLoggedIn: true,
};

const UserAuthFormSlice = createSlice({
    name:'userAuthForm',
    initialState,
    reducers: {
        toggleShowUserAuthForm: (state, action) => {
            state.showUserAuthForm = action.payload;
        },

        toggleIsUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload;
        }
    }
})

export const { toggleShowUserAuthForm, toggleIsUserLoggedIn } = UserAuthFormSlice.actions;

export const UserAuthFormReducers = UserAuthFormSlice.reducer;