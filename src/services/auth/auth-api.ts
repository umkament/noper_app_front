import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UserInterface } from '../users'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4411',
    credentials: 'include',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: builder => {
    return {
      authMe: builder.query<UserInterface, void>({
        query: () => `/auth/me`,
      }),
      loginUser: builder.mutation<UserInterface, Partial<UserInterface>>({
        query: credentials => ({
          body: credentials,
          method: 'POST',
          url: '/auth/login',
        }),
      }),
      registerUser: builder.mutation<UserInterface, Partial<UserInterface>>({
        query: newUser => ({
          body: newUser,
          method: 'POST',
          url: '/auth/register',
        }),
      }),
    }
  },
  reducerPath: 'authApi',
})

export const { useAuthMeQuery, useLoginUserMutation, useRegisterUserMutation } = authApi
