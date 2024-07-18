import { Link } from 'react-router-dom'

import toLoginLogo from '@/assets/toLogin.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { LiaHandPointer } from 'react-icons/lia'

import s from './login-page.module.scss'

export const LoginPage = () => {
  return (
    <div className={s.container}>
      <div className={s.card}>
        <img alt={'logo'} className={s.logo} src={toLoginLogo} />

        <Typography className={s.text} variant={'large'}>
          вход в аккаунт
        </Typography>
        <Input
          className={s.inputStyle}
          label={'e-mail'}
          placeholder={'e-mail, который вводили при регистрации'}
        ></Input>
        <Input
          className={s.inputStyle}
          label={'password'}
          placeholder={'надеемся, вы не забыли пароль'}
          type={'password'}
        ></Input>
        <Button className={s.btnStyle}>войти</Button>
        <Typography className={s.text} variant={'large'}>
          у вас все еще нет аккаунта?
        </Typography>
        <Button as={Link} className={s.btnStyle} to={'/auth'} variant={'link'}>
          создать
        </Button>
        <LiaHandPointer className={s.pointer} size={25} />
      </div>
    </div>
  )
}
