// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   middleware: getDefaultMiddleware => getDefaultMiddleware(),
//   reducer: {},
// })

// export const AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>

import { configureStore } from '@reduxjs/toolkit'

import { postsApi } from './posts/posts-api'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postsApi.middleware),
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
})
