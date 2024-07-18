import { useState } from 'react'

import ava from '@/assets/avatar.png'
import postImg from '@/assets/photo1.jpeg'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa6'
import { PiHandHeartLight } from 'react-icons/pi'

import s from './post-page.module.scss'

export const PostPage = () => {
  const [isSave, setIsSave] = useState(() => Math.random() < 0.5)

  console.log(setIsSave(isSave))

  return (
    <div className={s.mainContainer}>
      <div className={s.photoWrap}>
        <img alt={'postImg'} className={s.imgStyle} src={postImg} />
        <div className={s.infoText}>
          <Button variant={'icon'}>
            <Avatar avatar={ava} />
          </Button>
          <Typography className={s.view}>
            911
            <FaRegEye className={s.eyeIcon} size={24} />
          </Typography>
          <Button className={s.favorite} variant={'icon'}>
            {isSave ? <BsBalloonHeartFill size={22} /> : <PiHandHeartLight size={22} />}
            22
          </Button>
          <Typography className={s.date}>06.06.2024</Typography>
        </div>
      </div>
      <div className={s.textWrap}>
        <Typography className={s.text} variant={'body1'}>
          Катание на роликах комплексно развивает здоровье: разные группы мышц, дарит хорошее
          настроение, увеличивает физическую активность, координацию, укрепляет вестибулярный
          аппарат, сердечно-сосудистую систему, в целом, катаясь на роликах по паркам, мы много
          дышим и двигаемся, что любому из нас на пользу! Не все способны и готовы к правильному
          питанию, но каждый может купить ролики, чтобы сменить привычную нагрузку на роликовое
          катание. Катаясь на роликах, человек задействует 90% тела, что приносит большую пользу
          здоровью. Пожалуй, конкурентом роликам может стать лишь езда на лошади. Кататься на лошади
          по городу доступно не всем, а вот кататься на роликах доступно любому из нас! При катании
          на роликах активно работает нижняя часть тела: икры, мышцы голени и бедер. На практике
          такая мышечная работа сделает вас выносливее и красивее: рельеф ног и задней поверхности
          бедра подтянется, и, если за вами погонится страус, у вас будет шанс от него сбежать 😂
        </Typography>
      </div>
      <div className={s.commentWrap}>
        <div className={s.avaInput}>
          <Avatar avatar={ava} />
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
