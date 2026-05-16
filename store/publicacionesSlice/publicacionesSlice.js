import { createSlice } from "@reduxjs/toolkit";

// Esquema basico de un objeto que conforma el array de publicaciones.
const initialState = {
    publicaciones: []
}

const publicacionesSlice = createSlice({
    name: "feed",
    initialState,

    reducers: {
        establecerPublicaciones: (state, action) => {
            state.publicaciones = action.payload
        },
        
        anadirPublicacion : (state, action) => {    
            state.publicaciones.push(action.payload)
        },

        eliminarPublicacion: (state, action) => {
            //! Eliminar todos los comentarios una vez hecho
            // para eliminar en la parte de front, buscare por el id.
            // para borrar de la base de datos hare mas verificaciones.
            const nuevoArray = state.publicaciones.filter(item => item.id =! action.payload)
            state.publicaciones = [...nuevoArray]
        }
    }
})

export default publicacionesSlice.reducer;
export const { establecerPublicaciones, anadirPublicacion, eliminarPublicacion } = publicacionesSlice.actions;