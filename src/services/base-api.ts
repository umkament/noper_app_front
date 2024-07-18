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
      getDecks: builder.query<any, void>({
        query: () => `v1/decks`,
      }),
    }
  },
  reducerPath: 'baseApi',
})

export const { useGetDecksQuery } = baseApi
