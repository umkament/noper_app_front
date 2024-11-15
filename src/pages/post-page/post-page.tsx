import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ava from '@/assets/avatar.png'
import postImg from '@/assets/userPhoto.jpg'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { AddCommentForm } from '@/forms/addCommentForm/addCommentForm'
import { CommentsList } from '@/forms/commentsList/commentslList'
import { useAuthMeQuery } from '@/services/auth'
import {
  CommentInterface,
  useDeleteCommentMutation,
  useGetCommentsByPostQuery,
} from '@/services/comment'
import { PostInterface, useGetPostQuery } from '@/services/posts'
import { UserInterface } from '@/services/users'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa6'
import { PiHandHeartLight } from 'react-icons/pi'

import s from './post-page.module.scss'

export const PostPage = () => {
  const { postId } = useParams<{ postId?: string }>()
  const { userId } = useParams<{ userId?: string }>()

  console.log('userId:', userId)

  const {
    data: currentUser,
    error: userError,
    isLoading: userLoading,
  } = useAuthMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  console.log('currentUser from useAuthMeQuery:', currentUser)

  // Если postId отсутствует, передаем в useGetPostQuery skipToken, чтобы пропустить выполнение запроса
  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useGetPostQuery(postId ?? skipToken)

  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsLoading,
    refetch: commentsRefetch,
  } = useGetCommentsByPostQuery(postId ?? skipToken)

  const [comments, setComments] = useState(commentsData || [])

  useEffect(() => {
    if (commentsData) {
      console.log('Полученные комментарии:', commentsData)
      setComments(commentsData)
    }
  }, [commentsData])

  const handleAddComment = (newComment: CommentInterface) => {
    setComments([...comments, newComment])
  }

  useEffect(() => {
    if (postId && commentsRefetch) {
      commentsRefetch()
    }
  }, [postId, commentsRefetch])

  if (postLoading || userLoading) {
    return <div>Loading...</div>
  }
  if (userError) {
    return <div>Error loading user: {JSON.stringify(userError)}</div>
  }

  if (postError) {
    return <div>Error: {JSON.stringify(postError)}</div>
  }

  return post ? (
    <Post
      comments={comments}
      commentsRefetch={commentsRefetch}
      currentUser={currentUser}
      onAddComment={handleAddComment}
      post={post}
      postId={postId}
    />
  ) : (
    <Typography variant={'h2'}>Post not found</Typography>
  )
}

interface PostProps {
  comments: CommentInterface[]
  commentsRefetch: () => void
  currentUser: UserInterface | null | undefined
  onAddComment: (newComment: CommentInterface) => void
  post: PostInterface
  postId: string | undefined
}

export const Post: React.FC<PostProps> = ({
  comments,
  commentsRefetch,
  currentUser,
  onAddComment,
  post,
  postId,
}) => {
  const isSave = () => Math.random() < 0.5
  const [deleteComment, { error: deleteError, isLoading: isDeleting }] = useDeleteCommentMutation()
  const [updatedComments, setUpdatedComments] = useState(comments)

  const handleDeleteComment = async (commentId: string) => {
    console.log('Удаление комментария с ID:', commentId) // Отладка
    setUpdatedComments(prevComments => prevComments.filter(comment => comment._id !== commentId))
    try {
      await deleteComment(commentId).unwrap()
      // После успешного удаления, обновляем состояние комментариев
      if (postId) {
        commentsRefetch()
      }
      console.log(`Комментарий ${commentId} успешно удален`)
    } catch (error) {
      console.error('Ошибка при удалении комментария', error)
    }
  }

  useEffect(() => {
    setUpdatedComments(comments)
  }, [comments])

  const avatarImage =
    post?.user.avatarUrl && post.user.avatarUrl.startsWith('/uploads/')
      ? `http://localhost:4411${post.user.avatarUrl}` // Если путь относительный и начинается с /uploads/
      : post.user.avatarUrl || `https://robohash.org/${post.user.username}.png`
  const postImage =
    post?.imageUrl && post.imageUrl.startsWith('/uploads/')
      ? `http://localhost:4411${post.imageUrl}`
      : post.imageUrl || postImg

  return (
    <div className={s.mainContainer}>
      <div className={s.photoWrap}>
        <img alt={'postImg'} className={s.imgStyle} src={postImage} />
        <div className={s.info}>
          <Button variant={'icon'}>
            <Avatar avatar={avatarImage} />
          </Button>
          <Typography className={s.view}>
            <span className={s.viewsCount}>{post.viewsCount}</span>
            <FaRegEye className={s.eyeIcon} size={21} />
          </Typography>
          <Button className={s.favorite} variant={'icon'}>
            {isSave() ? <BsBalloonHeartFill size={22} /> : <PiHandHeartLight size={22} />}
            {post.likes}
          </Button>
          <Typography className={s.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </div>
      </div>
      <div className={s.textWrap}>
        <Typography className={s.title} variant={'h2'}>
          {post.title}
        </Typography>
        <Typography className={s.tags} variant={'caption'}>
          {post?.tags &&
            (post.tags.length > 1 ? (
              post.tags.map((tag, index) => <span key={index}>{`#${tag.trim()} `}</span>)
            ) : (
              <span>{`#${post.tags[0].trim()} `}</span>
            ))}
        </Typography>
        <Typography className={s.text} variant={'body1'}>
          {post.text}
        </Typography>
      </div>
      <div className={s.commentWrap}>
        <AddCommentForm onAddComment={onAddComment} postId={postId} />
        <CommentsList
          comments={updatedComments}
          currentUser={currentUser}
          onDeleteComment={handleDeleteComment}
          postAuthorId={post.user._id}
        />
        {isDeleting && (
          <Typography className={s.isDeleting} variant={'body1'}>
            комментарий удален без возможности восстановления
          </Typography>
        )}
        {deleteError &&
          (console.error('Ошибка при удалении комментария:', JSON.stringify(deleteError)),
          (<p></p>))}
      </div>
    </div>
  )
}
