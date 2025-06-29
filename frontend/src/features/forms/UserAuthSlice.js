import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showUserAuthForm: false,
    isUserLoggedIn: false,
    isHotelOwner: false,
    user:{},
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
        },

        toggleIsHotelOwner: (state, action) => {
            state.isHotelOwner = action.payload;
        },

        updateUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { toggleShowUserAuthForm, toggleIsUserLoggedIn, toggleIsHotelOwner, updateUser } = UserAuthFormSlice.actions;

export const UserAuthFormReducers = UserAuthFormSlice.reducer;