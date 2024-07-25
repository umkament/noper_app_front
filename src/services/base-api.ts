import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://back-to-home-pets-mern.vercel.app', //адрес апишки
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      getPosts: builder.query<any, void>({
        query: () => `/posts`,
      }),
    }
  },
  reducerPath: 'baseApi',
})

export const { useGetPostsQuery } = baseApi
