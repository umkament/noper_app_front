import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  reducer: {},
})

export const AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
