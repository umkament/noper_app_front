import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import postImg from '@/assets/photo4.jpeg'
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
    data: posts = [],
    error: postsError,
    isLoading: isPostsLoading,
  } = useGetUserPostsQuery(userId || '')
  const { data: currentUser } = useAuthMeQuery()

  const isCurrentUser = currentUser?._id === userId

  useEffect(() => {
    console.log('User Data:', user)
    console.log('Posts Data:', posts)
  }, [user, posts])

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
    <UserPageContent isCurrentUser={isCurrentUser} posts={posts || []} user={user} />
  ) : (
    <Typography variant={'h2'}>User not found</Typography>
  )
}

interface UserProps {
  isCurrentUser: boolean
  posts: PostInterface[]
  user: UserInterface
}

export const UserPageContent: React.FC<UserProps> = ({ isCurrentUser, posts, user }) => {
  const postsBlockClass = posts.length === 0 ? `${s.postsBlock} ${s.empty}` : s.postsBlock

  return (
    <div className={s.mainContainer}>
      <div className={s.infoBlock}>
        <div className={s.imgWrap}>
          <img
            alt={'postImg'}
            className={s.imgStyle}
            src={user.avatarUrl || `https://robohash.org/${user.username}.png`}
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
          <div className={s.buttonStyle}>
            {isCurrentUser ? (
              <Button as={Link} to={'/edit-profile'} variant={'tertiary'}>
                редактировать профиль <FaRegEdit />
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {isCurrentUser ? (
        <Button as={Link} to={'/add-post'}>
          добавить статью
          <GrTextWrap />
        </Button>
      ) : (
        ''
      )}
      <div className={s.postsBlockClass}>
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <Link key={post._id} to={`/post/${post._id}`}>
              <img
                alt={post.title}
                className={s.postImg}
                key={post._id}
                src={post.imageUrl || postImg}
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
