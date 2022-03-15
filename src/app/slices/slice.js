import { createSlice } from "@reduxjs/toolkit"; 

//SLICE requires:
// - string name for identification
// - initial state value
// - reducer functions to define how state can be updated

const initialState = {
    value: [],
}

export const favouriteSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        setFavourite: (state) => {
            console.log(state.value);
            //Redux Toolkit uses Immer library that detects changes to a 'draft' state and produces new IMMUTABLE state 
            state.value.push(state.value)
        },
        unfavourite: (state) => {
            state.value.pop(state.value)
        },
    },
})

// export generated Redux action creators and the reducer function for the whole SLICE

export const { setFavourite, unfavourite } = favouriteSlice.actions

export default favouriteSlice.reducer