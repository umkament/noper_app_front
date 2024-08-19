import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UserInterface } from '../users'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4411',
    credentials: 'include',
    // prepareHeaders: headers => {
    //   const token = localStorage.getItem('token')

    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`)
    //   }

    //   return headers
    // },
  }),
  endpoints: builder => {
    return {
      authMe: builder.query<UserInterface | null, void>({
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ['Me'],
        query: () => `/auth/me`,
      }),
      loginUser: builder.mutation<UserInterface, Partial<UserInterface>>({
        invalidatesTags: ['Me'],
        query: credentials => ({
          body: credentials,
          method: 'POST',
          url: '/auth/login',
        }),
      }),
      logoutUser: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('authMe', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: () => ({
          method: 'POST',
          url: '/auth/logout',
        }),
      }),
      registerUser: builder.mutation<UserInterface, Partial<UserInterface>>({
        invalidatesTags: ['Me'],
        query: newUser => ({
          body: newUser,
          method: 'POST',
          url: '/auth/register',
        }),
      }),
    }
  },
  reducerPath: 'authApi',
  tagTypes: ['Me'],
})

export const {
  useAuthMeQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
} = authApi
