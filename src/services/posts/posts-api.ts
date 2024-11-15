import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PostInterface } from './posts.type'

export const postsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4411',
    credentials: 'include',
    // prepareHeaders: headers => {
    //   headers.append('x-auth-skip', 'true')
    // },
  }),
  endpoints: builder => {
    return {
      createPost: builder.mutation({
        query: postData => {
          return {
            body: postData, // Текстовые данные (title, text, tags)
            method: 'POST',
            url: '/post',
          }
        },
      }),
      deletePostImage: builder.mutation<void, void>({
        invalidatesTags: ['Post'],
        query: () => ({
          method: 'DELETE',
          url: '/post/image',
        }),
      }),
      getPost: builder.query<PostInterface, string>({
        query: postId => `/post/${postId}`,
      }),
      getPosts: builder.query<PostInterface[], void>({
        query: () => `/posts`,
      }),
      uploadImage: builder.mutation<{ url: string }, FormData>({
        query: formData => ({
          body: formData,
          method: 'POST',
          url: '/upload/image',
        }),
      }),
    }
  },
  reducerPath: 'postsApi',
  tagTypes: ['Post'],
})

export const {
  useCreatePostMutation,
  useDeletePostImageMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUploadImageMutation,
} = postsApi
