import { createSlice } from '@reduxjs/toolkit'

const initialState = 0
export const ratingSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {
        getRating: (state, action) => {
            state = action.payload
            return state
        }
    },
})

export const { getRating } = ratingSlice.actions

export default ratingSlice.reducer
