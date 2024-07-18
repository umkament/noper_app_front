import { Button } from '@/components/ui/button'
import { UserCard } from '@/components/ui/userCard'

import s from './users-page.module.scss'

export function UsersPage() {
  return (
    <div className={s.mainContainer}>
      <div className={s.usersContainer}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      <div className={s.rightContainer}>
        <div className={s.fixed}>
          <Button>Тренеры</Button>
          <Button>Спортсмены</Button>
          <Button>Ученики</Button>
        </div>
      </div>
    </div>
  )
}
