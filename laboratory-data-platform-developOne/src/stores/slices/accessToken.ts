import { createSlice } from '@reduxjs/toolkit'
import { getToken } from '@/utils/func'

const accessToken = getToken() || ''

const initialState = accessToken

export const accessTokenSlice = createSlice({
    // store分库名称
    name: 'accessToken',
    // store分库初始值
    initialState,
    reducers: {
    },
})

export default accessTokenSlice.reducer
