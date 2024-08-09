import { UserInterface } from '../users'

export interface PostInterface {
  _id: string
  createdAt: Date
  imageUrl: string
  likes: number
  tags: string[]
  text: string
  title: string
  updatedAt: Date
  user: UserInterface
  viewsCount: number
}
