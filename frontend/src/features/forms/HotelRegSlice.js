import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showHotelRegForm:false,
    hotel: {}
}

const HotelRegSlice = createSlice({
    name:'hotelRegForm',
    initialState,
    reducers: {
        toggleShowHotelRegForm: (state, action) => {
            state.showHotelRegForm = action.payload;
        },
        updateHotel: (state, action) => {
            state.hotel = action.payload;
        }
    }
});

export const HotelRegReducers = HotelRegSlice.reducer;

export const { toggleShowHotelRegForm, updateHotel } = HotelRegSlice.actions;