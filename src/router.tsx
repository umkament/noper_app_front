import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ErrorPage } from '@/pages/error-page'
import { MainPage } from '@/pages/main-page'

import { AddPostPage } from './pages/add-page'
import { AuthPage } from './pages/auth-page'
import { EditProfilePage } from './pages/editProfile-page'
import { LoginPage } from './pages/login-page'
import { PostPage } from './pages/post-page'
import { UserPage } from './pages/user-page'
import { UsersPage } from './pages/users-page'

const privateRoutes: RouteObject[] = [
  //{ element: <Layout />, path: '/' },
  { element: <div> ProfilePage</div>, path: '/my-profile' },
  { element: <AddPostPage />, path: '/add-post' },
  { element: <EditProfilePage />, path: '/edit-profile' },
]
const publicRoutes: RouteObject[] = [
  { element: <div>loginPage</div>, path: '/login' },
  { element: <div> forgotPasswordPage</div>, path: '/forgot-password' },
  { element: <div> cardPage</div>, path: '/card/:id' },
  { element: <ErrorPage />, path: '/error' },
  { element: <MainPage />, path: '/' },
  { element: <UsersPage />, path: '/users' },
  { element: <PostPage />, path: '/post' },
  { element: <UserPage />, path: '/user' },
  { element: <LoginPage />, path: '/logout' },
  { element: <AuthPage />, path: '/auth' },
]
const router = createBrowserRouter([
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
