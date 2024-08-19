import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UserInterface } from '.'
import { PostInterface } from '../posts'

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4411',
    // credentials: 'include',
  }),
  endpoints: builder => {
    return {
      getUser: builder.query<UserInterface, string>({
        query: userId => `/user/${userId}`,
      }),
      getUserPosts: builder.query<PostInterface[], string>({
        query: userId => `/user/${userId}/posts`,
      }),
      getUsers: builder.query<UserInterface[], void>({
        query: () => `/users`,
      }),
    }
  },
  reducerPath: 'usersApi',
})

export const { useGetUserPostsQuery, useGetUserQuery, useGetUsersQuery } = usersApi
