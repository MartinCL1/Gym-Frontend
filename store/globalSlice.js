import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navegacion: false
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers : {
        setNavegacion: (state, action) => {
            state.navegacion = action.payload
        }
    }
})

export default globalSlice.reducer;
export const { setNavegacion } = globalSlice.actions;