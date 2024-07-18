import React from 'react'

import { UserPostCard } from '@/components/ui/userPostCard'

import s from './main-page.module.scss'

export const MainPage: React.FC = () => {
  return (
    <div className={s.container}>
      <UserPostCard />

      <UserPostCard />

      <UserPostCard />

      <UserPostCard />

      <UserPostCard />
    </div>
  )
}
