import { Link } from 'react-router-dom'

import URLogo from '@/assets/URLogo.png'
import logo from '@/assets/logoToLogin.png'
import toLoginLogo from '@/assets/toLogin.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { LiaHandPointer } from 'react-icons/lia'

import s from './auth-page.module.scss'

export const AuthPage = () => {
  return (
    <div className={s.container}>
      <div className={s.card}>
        <img alt={'logo'} className={s.logo} src={toLoginLogo} />
        <Typography className={s.text} variant={'large'}>
          создай свой профиль
        </Typography>
        <Input className={s.inputStyle} label={'Имя'}></Input>
        <Input className={s.inputStyle} label={'Фамилия'}></Input>
        <Input className={s.inputStyle} label={'Ник'} placeholder={'enter @your_Nikname'}></Input>
        <Input
          className={s.inputStyle}
          label={'e-mail'}
          placeholder={'этот e-mail будет использоваться при входе'}
        ></Input>
        <Input
          className={s.inputStyle}
          label={'password'}
          placeholder={'надеемся, вы не забыли пароль'}
          type={'password'}
        ></Input>
        <Button className={s.btnStyle}>зарегистрироваться</Button>
        <Typography className={s.text} variant={'large'}>
          если у вас уже есть аккаунт
        </Typography>
        <Button as={Link} className={s.btnStyle} to={'/logout'} variant={'link'}>
          войти
        </Button>
        <LiaHandPointer className={s.pointer} size={25} />
      </div>
    </div>
  )
}
