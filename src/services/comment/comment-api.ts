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
      getAllCommentLikes: builder.query<
        Record<string, { likedByUser: boolean; likesCount: number }>,
        { targetIds: string[]; targetType: string }
      >({
        query: ({ targetIds, targetType }) => ({
          body: { targetIds },
          method: 'POST',
          params: { targetType },
          url: `/likes/bulk`,
        }),
      }),
      getCommentLike: builder.query<
        { likedByUser: boolean; likesCount: number },
        { commentId: string }
      >({
        providesTags: (result, error, { commentId }) => [{ id: commentId, type: 'Comment' }],
        query: ({ commentId }) => ({
          params: { targetType: 'Comment' },
          url: `/likes/${commentId}`,
        }),
      }),

      getCommentsByPost: builder.query<CommentInterface[], string>({
        query: postId => `/comments/${postId}`,
      }),
      toggleCommentLike: builder.mutation<void, { commentId: string }>({
        invalidatesTags: (result, error, { commentId }) => [{ id: commentId, type: 'Comment' }],
        query: ({ commentId }) => ({
          body: { targetType: 'Comment' },
          method: 'POST',
          url: `/like/${commentId}`,
        }),
      }),
    }
  },
  reducerPath: 'commentApi',
  tagTypes: ['Comment'],
})

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentLikesQuery,
  useGetCommentLikeQuery,
  useGetCommentsByPostQuery,
  useToggleCommentLikeMutation,
} = commentApi
