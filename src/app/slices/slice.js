import { createSlice } from "@reduxjs/toolkit"; 

//SLICE requires:
// - string name for identification
// - initial state value
// - reducer functions to define how state can be updated

export const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: {
        value: [],
    },
    reducers: {
        setFavourites: (state, action) => {
            //Redux Toolkit uses Immer library that detects changes to a 'draft' state and produces new IMMUTABLE state 
            state.value = action.payload;
        },
    },
})

// export generated Redux action creators and the reducer function for the whole SLICE

export const { setFavourites } = favouriteSlice.actions

export default favouriteSlice.reducer