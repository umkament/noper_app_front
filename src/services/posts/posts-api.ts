import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PostInterface } from './posts.type'

export const postsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4411',
    // credentials: 'include',
    // prepareHeaders: headers => {
    //   headers.append('x-auth-skip', 'true')
    // },
  }),
  endpoints: builder => {
    return {
      getPost: builder.query<PostInterface, string>({
        query: postId => `/post/${postId}`,
      }),
      getPosts: builder.query<PostInterface[], void>({
        query: () => `/posts`,
      }),
    }
  },
  reducerPath: 'postsApi',
})

export const { useGetPostQuery, useGetPostsQuery } = postsApi
