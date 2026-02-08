import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}

const userSlice = createSlice( {
    name: "userInfo",
    initialState,

    // Acciones del slice global
    reducers: {
        // Funcion donde guarda la info del usuario por ejemplo id 
        establecerUsuario: (state, action) => {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer
export const {establecerUsuario} = userSlice.actions