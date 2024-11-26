import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import postImg from '@/assets/userPhoto.jpg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useAuthMeQuery } from '@/services/auth'
import { PostInterface } from '@/services/posts'
import { UserInterface, useGetUserPostsQuery, useGetUserQuery } from '@/services/users'
import { FaRegEdit } from 'react-icons/fa'
import { GrTextWrap } from 'react-icons/gr'

import s from './user-page.module.scss'

export const UserPage = () => {
  const { userId } = useParams<{ userId: string }>()

  const { data: user, error: userError, isLoading: isUserLoading } = useGetUserQuery(userId || '')

  const {
    data: responceData,
    error: postsError,
    isLoading: isPostsLoading,
  } = useGetUserPostsQuery(userId || '')

  const posts = Array.isArray(responceData) ? responceData : responceData?.posts || []

  if (!userId) {
    return <div>Error: User ID is missing</div>
  }

  if (isUserLoading || isPostsLoading) {
    return <div>Loading...</div>
  }

  if (userError) {
    return <div>Error: {JSON.stringify(userError)}</div>
  }
  if (postsError) {
    return <div>Error: {JSON.stringify(postsError)}</div>
  }

  return user ? (
    <UserPageContent posts={posts || []} user={user} userId={userId} />
  ) : (
    <Typography variant={'h2'}>User not found</Typography>
  )
}

interface UserProps {
  posts: PostInterface[]
  user: UserInterface
  userId: string
}

export const UserPageContent: React.FC<UserProps> = ({ posts, user, userId }) => {
  const postsBlockClass = posts.length === 0 ? `${s.postsBlock} ${s.empty}` : s.postsBlock

  const { data: currentUser } = useAuthMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !userId,
  })

  console.log('currentUser from useAuthMeQuery:', currentUser)

  const isCurrentUser = currentUser?._id === userId

  console.log('isCurrentUser:', isCurrentUser)
  console.log('avatarUrl:', user.avatarUrl)

  return (
    <div className={s.mainContainer}>
      <div className={s.infoBlock}>
        <div className={s.imgWrap}>
          <img
            alt={'postImg'}
            className={s.imgStyle}
            src={
              user?.avatarUrl && user.avatarUrl.startsWith('/uploads/')
                ? `http://localhost:4411${user.avatarUrl}` // Если путь относительный и начинается с /uploads/
                : user?.avatarUrl || `https://robohash.org/${user?.username}.png` // Если URL полный или не задан
            }
          />
        </div>
        <div className={s.textInfo}>
          <Typography className={s.username} variant={'caption'}>
            @{user.username}
          </Typography>
          <Typography className={s.name}>{`${user.name} ${user.surname}`}</Typography>
          <Typography
            className={`${s.description} ${!user.description ? s.empty : ''}`}
            variant={'body1'}
          >
            {user.description}
          </Typography>
          {isCurrentUser && (
            <Typography as={Link} className={s.link} to={`${user.link}`} variant={'link1'}>
              {user.link}
            </Typography>
          )}
          <div className={s.buttonStyle}>
            {isCurrentUser && (
              <Button as={Link} to={`/edit-profile`} variant={'tertiary'}>
                редактировать профиль <FaRegEdit />
              </Button>
            )}
          </div>
        </div>
      </div>
      {isCurrentUser && (
        <Button as={Link} to={'/add-post'}>
          добавить статью
          <GrTextWrap />
        </Button>
      )}

      <div className={postsBlockClass}>
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <Link key={post._id} to={`/post/${post._id}`}>
              <img
                alt={post.title}
                className={s.postImg}
                key={post._id}
                src={
                  post?.imageUrl && post.imageUrl.startsWith('/uploads/')
                    ? `http://localhost:4411${post.imageUrl}` // Если путь относительный и начинается с /uploads/
                    : post.imageUrl || postImg
                }
              />
            </Link>
          ))
        ) : (
          <Typography className={s.text} variant={'h3'}>
            пока нет опубликованных статей
          </Typography>
        )}
      </div>
    </div>
  )
}
