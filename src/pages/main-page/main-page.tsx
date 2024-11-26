import React from 'react'

import { UserPostCard } from '@/forms/userPostCard'
import { useGetPostsQuery } from '@/services/posts/posts-api'

import s from './main-page.module.scss'

export const MainPage: React.FC = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return (
    <div className={s.container}>
      {posts
        ?.slice()
        .reverse()
        .map(post => <UserPostCard key={post._id} post={post} />)}
    </div>
  )
}
