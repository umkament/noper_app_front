import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { UserInterface } from '@/services/users'
import { GiSkateboard } from 'react-icons/gi'
import { MdRollerSkating } from 'react-icons/md'

import s from './userCard.module.scss'

type UserPostCardProps = {
  user: UserInterface
}

export const UserCard: React.FC<UserPostCardProps> = ({ user }) => {
  const random = () => Math.random() < 0.5

  return (
    <Button as={Link} className={s.buttonWrap} to={`/user/${user._id}`} variant={'tertiary'}>
      <div className={s.imageWrap}>
        <img
          className={s.imgprof}
          src={
            user?.avatarUrl && user.avatarUrl.startsWith('/uploads/')
              ? `http://localhost:4411${user.avatarUrl}` // Если путь относительный и начинается с /uploads/
              : user?.avatarUrl || `https://robohash.org/${user?.username}.png` // Если URL полный или не задан
          }
        />
      </div>
      <div className={s.textContent}>
        <Typography className={s.userName} variant={'h3'}>
          {user.username}
        </Typography>
        <Typography className={s.name} variant={'subtitle1'}>
          {`${user.name} ${user.surname}`}
        </Typography>
        <Button className={s.discipline} variant={'icon'}>
          {random() ? <GiSkateboard /> : <MdRollerSkating />}
        </Button>
      </div>
    </Button>
  )
}
