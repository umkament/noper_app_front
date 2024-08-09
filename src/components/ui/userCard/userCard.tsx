import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { UserInterface } from '@/services/users'
import { GiSkateboard } from 'react-icons/gi'
import { MdRollerSkating } from 'react-icons/md'

import s from './userCard.module.scss'

import { Button } from '../button'
import { Typography } from '../typography'

type UserPostCardProps = {
  user: UserInterface
}

export const UserCard: React.FC<UserPostCardProps> = ({ user }) => {
  const random = () => Math.random() < 0.5

  return (
    <Button as={Link} className={s.buttonWrap} to={`/user/${user._id}`} variant={'tertiary'}>
      <div className={s.imageWrap}>
        <img className={s.imgprof} src={user.avatarUrl} />
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
