import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserAuthFormReducers } from "../features/forms/UserAuthSlice.js";
import { HotelRegReducers } from "../features/forms/HotelRegSlice.js";
import { RoomReducers } from "../features/RoomSlice.js";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const combinedReducers = combineReducers({
    user: UserAuthFormReducers,
    hotel: HotelRegReducers,
    room: RoomReducers,
})

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['user.user.image']
            },
        })
)
});

const persistor = persistStore(store);

export {store, persistor};