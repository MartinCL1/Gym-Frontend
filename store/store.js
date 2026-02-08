import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice/userSlice'
import globalSlice from './globalSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        global: globalSlice
    }
})