import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UserInterface } from '../users'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4411',
  }),
  endpoints: builder => {
    return {
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

export const { useRegisterUserMutation } = authApi
