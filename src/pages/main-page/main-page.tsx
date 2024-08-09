import React from 'react'

import { UserPostCard } from '@/components/ui/userPostCard'
import { useGetPostsQuery } from '@/services/posts/posts-api'

import s from './main-page.module.scss'

// export const MainPage: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<null | string>(null)

//   return (
//     <div className={s.container}>
//       <UserPostCard />

//       <UserPostCard />

//       <UserPostCard />

//       <UserPostCard />

//       <UserPostCard />
//     </div>
//   )
// }

export const MainPage: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([])
  // const [loading, setLoading] = useState<boolean>(true)
  // const [error, setError] = useState<null | string>(null)

  // useEffect(() => {
  //   const loadPosts = async () => {
  //     try {
  //       const postsData = await fetchPosts()

  //       setPosts(postsData)
  //       setLoading(false)
  //     } catch (err: any) {
  //       setError(err.message)
  //       setLoading(false)
  //     }
  //   }

  //   loadPosts()
  // }, [])

  const { data: posts, error, isLoading } = useGetPostsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return (
    <div className={s.container}>
      {posts?.map(post => <UserPostCard key={post._id} post={post} />)}
    </div>
  )
}
