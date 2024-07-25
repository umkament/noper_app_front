import React from 'react'
import { Link } from 'react-router-dom'

import ava from '@/assets/avatar.png'
import cardImg from '@/assets/photo1.jpeg'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Post } from '@/pages/main-page'
import { PostInterface } from '@/services/posts/posts.type'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa6'
import { PiHandHeartLight } from 'react-icons/pi'

import s from './userPostCard.module.scss'

import { Avatar } from '../avatar'
import { Button } from '../button'

type UserPostCardProps = {
  post: PostInterface
}

export const UserPostCard: React.FC<UserPostCardProps> = ({ post }) => {
  //const [isSave, setIsSave] = useState(() => Math.random() < 0.5)
  const isSave = () => Math.random() < 0.5

  // console.log(setIsSave(isSave))

  //   return (
  //     <Card className={s.card}>
  //       <Link className={s.linkoff} to={'/post'}>
  //         <img alt={'user_photo'} className={s.cardImg} src={cardImg} />
  //       </Link>
  //       <div className={s.textWrap}>
  //         <div className={s.avaName}>
  //           <Button as={Link} to={'/user'} variant={'icon'}>
  //             <Avatar avatar={ava} />
  //           </Button>

  //           <Typography className={s.userName} variant={'h3'}>
  //             umkament
  //           </Typography>
  //         </div>
  //         <Typography className={s.title} variant={'h2'}>
  //           мои первые летние соревнования в этом году
  //         </Typography>

  //         <div className={s.wrapinfo}>
  //           <Typography className={s.date}>06.06.2024</Typography>
  //           <div className={s.whatcher}>
  //             <Typography className={s.centerview}>
  //               911
  //               <FaRegEye className={s.eyeIcon} size={24} />
  //             </Typography>
  //             <Button className={s.favorite} variant={'icon'}>
  //               {isSave() ? <BsBalloonHeartFill size={22} /> : <PiHandHeartLight size={22} />}
  //               22
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </Card>
  //   )
  // }

  return (
    <Card className={s.card}>
      <Link className={s.linkoff} to={`/post/${post._id}`}>
        <img alt={'user_photo'} className={s.cardImg} src={post.imageUrl} />
      </Link>
      <div className={s.textWrap}>
        <div className={s.avaName}>
          <Button as={Link} to={`/user/${post.user._id}`} variant={'icon'}>
            <Avatar avatar={post.user.avatarUrl} />
          </Button>
          <Typography className={s.userName} variant={'h3'}>
            {post.user.username}
          </Typography>
        </div>
        <Typography className={s.title} variant={'h2'}>
          {post.title}
        </Typography>
        <Typography className={s.description} variant={'body1'}>
          {post.text}
        </Typography>
        <div className={s.wrapinfo}>
          <Typography className={s.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
          <div className={s.whatcher}>
            <Typography className={s.centerview}>
              {post.viewsCount}
              <FaRegEye className={s.eyeIcon} size={24} />
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
