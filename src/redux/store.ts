import { configureStore } from '@reduxjs/toolkit'
import dataSlice  from './dataSlice'

export const store = configureStore({
  reducer: {
    data:dataSlice
  },
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
