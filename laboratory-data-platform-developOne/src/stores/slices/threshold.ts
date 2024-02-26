import { createSlice } from '@reduxjs/toolkit'

const initialState = [0.5,0.5,0.5]
export const thresholdSlice = createSlice({
    name: 'threshold',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state = action.payload
            return state
        }
    },
})

export const { setValue } = thresholdSlice.actions

export default thresholdSlice.reducer
