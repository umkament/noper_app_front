// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   middleware: getDefaultMiddleware => getDefaultMiddleware(),
//   reducer: {},
// })

// export const AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>

import { configureStore } from '@reduxjs/toolkit'

import { authApi } from './auth'
import { postsApi } from './posts'
import { usersApi } from './users'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(usersApi.middleware)
      .concat(authApi.middleware),
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
})
