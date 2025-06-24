import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserAuthFormReducers } from "../features/forms/UserAuthSlice";
import { HotelRegReducers } from "../features/forms/HotelRegSlice";

const combinedReducers = combineReducers({
    user: UserAuthFormReducers,
    hotel: HotelRegReducers
})

const store = configureStore({
    reducer: combinedReducers
});

export default store;