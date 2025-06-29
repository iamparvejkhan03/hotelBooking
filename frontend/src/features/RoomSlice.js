import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    room:{}
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        updateRoom: (state, action) => {
            state.room = action.payload;
        }
    }
})

export const RoomReducers = roomSlice.reducer;

export const { updateRoom } = roomSlice.actions;