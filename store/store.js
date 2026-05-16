import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice/userSlice'
import globalSlice from './globalSlice'
import publicacionesSlice from './publicacionesSlice/publicacionesSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        global: globalSlice,
        publicaciones: publicacionesSlice
    }
})