import React from 'react'
import { Link } from 'react-router-dom'

import postImg from '@/assets/userPhoto.jpg'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { PostInterface } from '@/services/posts/posts.type'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa6'
import { PiHandHeartLight } from 'react-icons/pi'

import s from './userPostCard.module.scss'

type UserPostCardProps = {
  post: PostInterface
}

export const UserPostCard: React.FC<UserPostCardProps> = ({ post }) => {
  const isSave = () => Math.random() < 0.5
  const avatarImage =
    post?.user.avatarUrl && post.user.avatarUrl.startsWith('/uploads/')
      ? `http://localhost:4411${post.user.avatarUrl}` // Если путь относительный и начинается с /uploads/
      : post.user.avatarUrl || `https://robohash.org/${post.user.username}.png`
  const postImage =
    post?.imageUrl && post.imageUrl.startsWith('/uploads/')
      ? `http://localhost:4411${post.imageUrl}`
      : post.imageUrl || postImg

  return (
    <Card className={s.card}>
      <Link className={s.linkoff} to={`/post/${post._id}`}>
        <img alt={'user_photo'} className={s.cardImg} src={postImage} />
      </Link>
      <div className={s.textWrap}>
        <div className={s.avaName}>
          <Button as={Link} to={`/user/${post.user._id}`} variant={'icon'}>
            <Avatar avatar={avatarImage} />
          </Button>
          <Typography className={s.userName} variant={'h3'}>
            {post.user.username}
          </Typography>
        </div>
        <Typography className={s.title} variant={'h2'}>
          {post.title}
        </Typography>
        {/* <Typography className={s.description} variant={'body1'}>
          {post.text}
        </Typography> */}
        <div className={s.wrapinfo}>
          <Typography className={s.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
          <div className={s.whatcher}>
            <Typography className={s.centerview}>
              <span className={s.viewsCount}>{post.viewsCount}</span>
              <FaRegEye className={s.eyeIcon} size={20} />
            </Typography>
            <Button className={s.favorite} variant={'icon'}>
              {isSave() ? <BsBalloonHeartFill size={22} /> : <PiHandHeartLight size={22} />}
              {post.likes}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
