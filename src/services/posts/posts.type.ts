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

export interface UserInterface {
  _id: Id
  avatarUrl: string
  createdAt: string
  email: string
  name: string
  passwordHash: string
  surname: string
  updatedAt: string
  username: string
}

export interface CreatedAt {
  date: string
}
