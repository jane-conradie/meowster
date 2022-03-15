import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from './slices/slice';

export const store = configureStore({
    reducer: {
        // importing REDUCER function from slice and adding to STORE
        // will use this slice reducer function for handling all updates
        favourite: favouriteReducer
    },
})
