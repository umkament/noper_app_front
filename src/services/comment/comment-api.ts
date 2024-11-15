import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { CommentInterface, CreateCommentDto, GetCommentsByPostResponse } from './comment.type'

export const commentApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4411',
    credentials: 'include',
  }),
  endpoints: builder => {
    return {
      createComment: builder.mutation<CommentInterface, CreateCommentDto>({
        query: ({ postId, text }) => ({
          body: { postId, text },
          method: 'POST',
          url: '/comment',
        }),
      }),
      deleteComment: builder.mutation<void, string>({
        query: commentId => ({
          method: 'DELETE',
          url: `/comment/${commentId}`,
        }),
      }),
      getCommentsByPost: builder.query<CommentInterface[], string>({
        query: postId => `/comments/${postId}`,
      }),
    }
  },
  reducerPath: 'commentApi',
  tagTypes: ['comment'],
})

export const { useCreateCommentMutation, useDeleteCommentMutation, useGetCommentsByPostQuery } =
  commentApi
