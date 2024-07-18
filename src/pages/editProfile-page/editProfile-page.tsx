import { React, useRef } from 'react'
import { Link } from 'react-router-dom'

import { toLoginLogo } from '@/assets'
import avatar from '@/assets/profileimg.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TextArea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { LiaHandPointer } from 'react-icons/lia'
import { MdOutlineAddAPhoto } from 'react-icons/md'

import s from './editProfile-page.module.scss'

export const EditProfilePage = () => {
  const inputFileRef: React.MutableRefObject<null> = useRef(null)

  return (
    <div className={s.container}>
      <div className={s.card}>
        <img alt={'logo'} className={s.logo} src={toLoginLogo} />
        <Typography className={s.text} variant={'large'}>
          измени/дополни информацию о себе
        </Typography>
        <Input
          className={s.inputStyle}
          label={'username'}
          placeholder={'umkament'}
          type={'text'}
        ></Input>
        <Input className={s.inputStyle} label={'Имя'} placeholder={'Umka'}></Input>
        <Input className={s.inputStyle} label={'Фамилия'} placeholder={'Medvezhatova'}></Input>
        <TextArea className={s.textareaStyle} label={'о себе'} placeholder={'ругаюсь матом'} />

        <Input className={s.inputStyle} label={'e-mail'} placeholder={'testmail@gmail.ru'}></Input>
        <div className={s.addAvatarWrap}>
          <img alt={'avatar'} className={s.avatarStyle} src={avatar} />
          <Button onClick={() => inputFileRef.current.onClick()}>
            оформить аватар <MdOutlineAddAPhoto />
          </Button>
        </div>
        <Input
          className={s.inputStyle}
          label={'ссылка на соцсети'}
          placeholder={'https://testadress.com'}
        ></Input>
        <Button className={s.btnStyle}>сохранить изменения</Button>
        <Typography className={s.text} variant={'large'}>
          оставить без изменений и
        </Typography>
        <Button as={Link} className={s.btnStyle} to={'/logout'} variant={'link'}>
          выйти
        </Button>
        <LiaHandPointer className={s.pointer} size={25} />
        {/* <Input placeholder={'оформить аватар'} type={'file'} /> */}
      </div>
    </div>
  )
}
