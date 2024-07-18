//добавить данные из редакс useAuthMeQuery и т д
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { avatar, logoUR } from '@/assets'
import URLogo from '@/assets/URLogo.png'
import { AvatarWithName } from '@/components/ui/avatar/avatarWithName'
import { Button } from '@/components/ui/button'
import { DropDownItem, DropDownMenu } from '@/components/ui/dropDownMenu'
import { Header } from '@/components/ui/header'
import { FaPeopleRobbery } from 'react-icons/fa6'
import { GiNewspaper, GiRollerSkate } from 'react-icons/gi'
import { GoInfo } from 'react-icons/go'

import s from './layout.module.scss'

import { Avatar } from '../ui/avatar'

export const Layout = () => {
  //const [userData, setUserData] = useState('1')
  const [menuOpen, setMenuOpen] = useState(false)

  const userData = '1'

  //console.log(setUserData(userData))

  const logOutHandler = () => {
    // Имитация выхода из системы
    const fakeLogout = () => new Promise(resolve => setTimeout(resolve, 1000)) // Имитация задержки на 1 секунду

    fakeLogout().then(() => {
      const notification = 'Successfully logged out'

      // Заменяем вывод уведомления на простой console.log, так как мы не имеем реальных данных о пользователе
      console.log(notification)
      //toast.success(notification, successOptions); // Вызываем уведомление (закомментировано для замены на console.log)
    })
  }
  const menuChangeHandler = (open: boolean) => {
    setMenuOpen(open)
  }

  return (
    <>
      <Header>
        <div className={s.header_body}>
          <Link to={'/'}>
            {/* <img alt={logoUR} className={s.logo} src={logoUR} /> */}
            <img alt={logoUR} className={s.logo} src={URLogo} />
          </Link>
          <nav className={s.header_nav}>
            <ul className={s.list_menu}>
              <Link className={s.linkOff} to={'/'}>
                <Button variant={'icon'}>
                  <li className={s.list_item}>
                    <GiNewspaper className={s.icons} /> <span className={s.text}>лента</span>
                  </li>
                </Button>
              </Link>

              <Link className={s.linkOff} to={'/users'}>
                <Button variant={'icon'}>
                  <li className={s.list_item}>
                    <FaPeopleRobbery className={s.icons} />{' '}
                    <span className={s.text}>спортсмены</span>
                  </li>
                </Button>
              </Link>

              <Link className={s.linkOff} to={'/error'}>
                <Button variant={'icon'}>
                  <li className={s.list_item}>
                    <GiRollerSkate className={s.icons} /> <span className={s.text}>дисциплин</span>
                  </li>
                </Button>
              </Link>

              <Link className={s.linkOff} to={'/error'}>
                <Button variant={'icon'}>
                  <li className={s.list_item}>
                    <GoInfo className={s.icons} /> <span className={s.text}>контакты</span>
                  </li>
                </Button>
              </Link>
            </ul>
          </nav>

          {userData ? (
            <DropDownMenu
              aline={'end'}
              isMenuOpen={menuOpen}
              onChange={menuChangeHandler}
              trigger={<AvatarWithName avatar={avatar} name={'umkament'} />}
            >
              <>
                <DropDownItem>
                  <Button as={Link} to={'/my-profile'}>
                    моя страница <Avatar avatar={avatar} />
                  </Button>
                </DropDownItem>
                <DropDownItem>
                  <Button as={Link} className={s.link} onClick={logOutHandler} to={'/logout'}>
                    выйти
                  </Button>
                </DropDownItem>
              </>
            </DropDownMenu>
          ) : (
            <Button as={Link} to={'/login'} variant={'primary'}>
              Вход / Регистрация
            </Button>
          )}
        </div>
      </Header>
      <Outlet />
    </>
  )
}
