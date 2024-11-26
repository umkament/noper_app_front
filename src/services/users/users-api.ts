import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UserInterface } from '.'
import { UserPostsResponce } from '../posts'

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4411',
    credentials: 'include',
  }),
  endpoints: builder => {
    return {
      getUser: builder.query<UserInterface, string>({
        query: userId => `/user/${userId}`,
      }),
      getUserLike: builder.query<{ likedByUser: boolean; likesCount: number }, { userId: string }>({
        providesTags: (result, error, { userId }) => [{ id: userId, type: 'User' }],
        query: ({ userId }) => ({
          params: { targetType: 'User' },
          url: `/likes/${userId}`,
        }),
      }),
      getUserPosts: builder.query<UserPostsResponce, string>({
        query: userId => `/user/${userId}/posts`,
      }),
      getUsers: builder.query<UserInterface[], void>({
        query: () => `/users`,
      }),
      toggleUserLike: builder.mutation<void, { userId: string }>({
        invalidatesTags: (result, error, { userId }) => [{ id: userId, type: 'User' }],
        query: ({ userId }) => ({
          body: { targetType: 'User' },
          method: 'POST',
          url: `/like/${userId}`,
        }),
      }),
    }
  },
  reducerPath: 'usersApi',
  tagTypes: ['User'],
})

export const {
  useGetUserLikeQuery,
  useGetUserPostsQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useToggleUserLikeMutation,
} = usersApi
