import { Button } from '@/components/ui/button'
import { UserCard } from '@/components/ui/userCard'
import { useGetUsersQuery } from '@/services/users'

import s from './users-page.module.scss'

export function UsersListPage() {
  const { data: users, error, isLoading } = useGetUsersQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.usersContainer}>
        {users?.map(user => <UserCard key={user._id} user={user} />)}
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
