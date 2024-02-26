import { configureStore,combineReducers } from '@reduxjs/toolkit'
// 引入主题换肤store分库
import themeReducer from './slices/theme'
import accessTokenReducer from './slices/accessToken'
import earlyWarningOptionSlice from './states/earlyWarningOptionSlice'
import earlyWarningReturnSlice from './states/earlyWarningReturnSlice'
import thresholdReducer from './slices/threshold'
import ratingsReducer from './slices/ratings'

const reducers=combineReducers({
  theme: themeReducer,
  accessToken: accessTokenReducer,
  earlyWarningOption: earlyWarningOptionSlice,
  earlyWarningReturn: earlyWarningReturnSlice,
  threshold: thresholdReducer,
  ratings: ratingsReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: reducers,
  devTools: true, // 是否使用redux开发者工具
})
