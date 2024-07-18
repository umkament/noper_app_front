import { useState } from 'react'
import { Link } from 'react-router-dom'

import postImg from '@/assets/photo4.jpeg'
import userImg from '@/assets/userPhoto.jpg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { FaRegEdit } from 'react-icons/fa'
import { GrTextWrap } from 'react-icons/gr'

import s from './user-page.module.scss'

export const UserPage = () => {
  const [isAuth, setIsAuth] = useState(true)

  console.log(setIsAuth(isAuth))

  return (
    <div className={s.mainContainer}>
      <div className={s.infoBlock}>
        <div className={s.imgWrap}>
          <img alt={'postImg'} className={s.imgStyle} src={userImg} />
        </div>
        <div className={s.textInfo}>
          <Typography className={s.username} variant={'caption'}>
            @umkament
          </Typography>
          <Typography className={s.name}>Умка Медвежатова</Typography>
          <Typography className={s.description} variant={'body1'}>
            катаюсь на роликах, не люблю людей, сижу в телеге
          </Typography>
          <div className={s.buttonStyle}>
            {isAuth ? (
              <Button as={Link} to={'/edit-profile'} variant={'tertiary'}>
                редактировать профиль <FaRegEdit />
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Button as={Link} to={'/add-post'}>
        добавить статью
        <GrTextWrap />
      </Button>
      <div className={s.postsBlock}>
        <img className={s.postImg} src={postImg} />
        <img className={s.postImg} src={postImg} />
        <img className={s.postImg} src={postImg} />
        <img className={s.postImg} src={postImg} />
        <img className={s.postImg} src={postImg} />
        <img className={s.postImg} src={postImg} />
        <img className={s.postImg} src={postImg} />
        <img className={s.postImg} src={postImg} />
      </div>
    </div>
  )
}
