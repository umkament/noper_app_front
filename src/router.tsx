import { Navigate, Outlet, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ErrorPage } from '@/pages/error-page'
import { MainPage } from '@/pages/main-page'

import { AddPostPage } from './pages/addPost-page'
import { EditProfilePage } from './pages/editProfile-page'
import { PostPage } from './pages/post-page'
import { SignInPage } from './pages/signIn-page'
import { SignUpPage } from './pages/signUp-page'
import { UserPage } from './pages/user-page'
import { UsersListPage } from './pages/users-page'

const privateRoutes: RouteObject[] = [
  //{ element: <Layout />, path: '/' },
  { element: <div> ProfilePage</div>, path: '/my-profile' },
  { element: <AddPostPage />, path: '/add-post' },
  { element: <EditProfilePage />, path: '/edit-profile' },
]
const publicRoutes: RouteObject[] = [
  { element: <div> forgotPasswordPage</div>, path: '/forgot-password' },
  { element: <ErrorPage />, path: '/error' },
  { element: <MainPage />, path: '/' },
  { element: <UsersListPage />, path: '/users' },
  { element: <PostPage />, path: '/post/:postId' },
  { element: <UserPage />, path: '/user/:userId' },
  { element: <SignInPage />, path: '/login' },
  { element: <SignUpPage />, path: '/auth/register' },
]
const router = createHashRouter([
  {
    children: [
      ...publicRoutes,
      { children: privateRoutes, element: <PrivateRoutes /> },
      {
        element: <ErrorPage />,
        path: '*',
      },
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
