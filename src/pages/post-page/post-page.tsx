import React from 'react'
import { useParams } from 'react-router-dom'

import ava from '@/assets/avatar.png'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { PostInterface, useGetPostQuery } from '@/services/posts'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa6'
import { PiHandHeartLight } from 'react-icons/pi'

import s from './post-page.module.scss'

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>()
  const { data: post, error, isLoading } = useGetPostQuery(postId)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return post ? <Post post={post} /> : <Typography variant={'h2'}>Post not found</Typography>
}

interface PostProps {
  post: PostInterface
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const isSave = () => Math.random() < 0.5

  return (
    <div className={s.mainContainer}>
      <div className={s.photoWrap}>
        <img alt={'postImg'} className={s.imgStyle} src={post.imageUrl} />
        <div className={s.infoText}>
          <Button variant={'icon'}>
            <Avatar avatar={post.user.avatarUrl} />
          </Button>
          <Typography className={s.view}>
            <span className={s.viewsCount}>{post.viewsCount}</span>
            <FaRegEye className={s.eyeIcon} size={21} />
          </Typography>
          <Button className={s.favorite} variant={'icon'}>
            {isSave() ? <BsBalloonHeartFill size={22} /> : <PiHandHeartLight size={22} />}
            {post.likes}
          </Button>
          <Typography className={s.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </div>
      </div>
      <div className={s.textWrap}>
        <Typography className={s.title} variant={'h2'}>
          {post.title}
        </Typography>
        <Typography className={s.text} variant={'body1'}>
          {post.text}
        </Typography>
      </div>
      <div className={s.commentWrap}>
        <div className={s.avaInput}>
          <Avatar avatar={post.user.avatarUrl} />
          <Input />
        </div>
        <Typography className={s.comment} variant={'subtitle1'}>
          <Avatar avatar={ava} /> 😂😂😂😂😂😂
        </Typography>
        <Typography className={s.comment} variant={'subtitle1'}>
          <Avatar avatar={ava} />
          Хочу записаться к вам на тренировки
        </Typography>
        <Typography className={s.comment} variant={'subtitle1'}>
          <Avatar avatar={ava} />
          ❤️❤️❤️❤️❤️
        </Typography>
      </div>
    </div>
  )
}
