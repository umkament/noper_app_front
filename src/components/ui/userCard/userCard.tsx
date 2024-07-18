import { useState } from 'react'

import profileImg from '@/assets/profileimg.png'
import { GiSkateboard } from 'react-icons/gi'
import { MdRollerSkating } from 'react-icons/md'

import s from './userCard.module.scss'

import { Button } from '../button'
import { Typography } from '../typography'

export const UserCard = () => {
  const [random, setRandom] = useState(() => Math.random() < 0.5)

  //console.log(setRandom(random))

  return (
    <Button className={s.buttonWrap} variant={'tertiary'}>
      <div className={s.imageWrap}>
        <img className={s.imgprof} src={profileImg} />
      </div>
      <div className={s.textContent}>
        <Typography className={s.userName} variant={'h3'}>
          Rollerman_1221
        </Typography>
        <Typography className={s.name} variant={'subtitle1'}>
          Иван Петров{' '}
        </Typography>
        <Button className={s.discipline} variant={'icon'}>
          {random ? <GiSkateboard /> : <MdRollerSkating />}
        </Button>
      </div>
    </Button>
  )
}
