import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthMeQuery } from '@/services/auth'
import {
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useUploadImageMutation,
} from '@/services/posts'
import { MdAddAPhoto, MdOutlineAddAPhoto } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import 'simplemde/dist/simplemde.min.css'

import s from './addPost-page.module.scss'

export const AddPostPage = () => {
  const { postId } = useParams<{ postId: string }>()
  const [createPost] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()
  const [uploadImage] = useUploadImageMutation()
  const { data: post } = useGetPostQuery(postId, { skip: !postId })
  const { data: user } = useAuthMeQuery()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  const inputFileRef = useRef<HTMLInputElement>(null)
  const isEdit = !!postId

  // Инициализация полей в режиме редактирования
  useEffect(() => {
    if (isEdit && post) {
      setTitle(post.title)
      setText(post.text)
      setTags(post.tags?.join(', ') || '')
      setImagePreview(post.imageUrl || '')
    }
  }, [post, isEdit])

  // Настройки редактора
  const uniqueId = useMemo(() => uuidv4(), [])
  const onChange = (value: string) => {
    setText(value)
  }
  const options = useMemo(
    () => ({
      autofocus: true,
      autosave: {
        delay: 1000,
        enabled: true,
        uniqueId: uniqueId,
      },
      maxHeight: '400px',
      placeholder: 'Введите текст...',
      spellChecker: false,
      status: false,
    }),
    [uniqueId]
  )

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    setSelectedFile(file)

    if (file) {
      const previewUrl = URL.createObjectURL(file)

      setImagePreview(previewUrl)
    }
  }
  const handleDeletePostImage = () => {
    setImagePreview('')
    setSelectedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = imagePreview

      // Загружаем изображение, если оно выбрано
      if (selectedFile) {
        const formData = new FormData()

        formData.append('image', selectedFile)
        const imageResponse = await uploadImage(formData).unwrap()

        imageUrl = imageResponse.url // URL загруженного изображения
      }

      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const postData = {
        imageUrl,
        tags: tagsArray,
        text,
        title,
      }

      if (isEdit) {
        // Обновление поста
        await updatePost({ data: postData, postId: postId! }).unwrap()
        alert('Пост успешно обновлен!')
      } else {
        // Создание нового поста
        const newPost = await createPost(postData).unwrap()

        alert('Пост успешно создан!')
        navigate(`/post/${newPost._id}`)
      }

      navigate(`/user/${user?._id}`)
    } catch (error) {
      console.error('Ошибка при сохранении поста:', error)
      alert('Не удалось сохранить пост.')
    }
  }

  return (
    <form className={s.container} onSubmit={handleSubmit}>
      <div
        className={s.illustrator}
        style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }}
      >
        <input hidden onChange={handleFileChange} ref={inputFileRef} type={'file'} />
        {imagePreview ? (
          <Button onClick={handleDeletePostImage} type={'button'}>
            Удалить изображение <MdOutlineAddAPhoto />
          </Button>
        ) : (
          <Button onClick={handleButtonClick} type={'button'}>
            Добавить изображение <MdAddAPhoto />
          </Button>
        )}
      </div>
      <Input
        className={s.title}
        label={'Заглавие статьи'}
        name={'title'}
        onChange={e => setTitle(e.target.value)}
        placeholder={'Придумайте заголовок для своей статьи'}
        value={title}
      />
      <Input
        className={s.tags}
        label={'Теги'}
        name={'tags'}
        onChange={e => setTags(e.target.value)}
        placeholder={'Если тегов больше, чем один, добавьте запятую'}
        value={tags}
      />
      <SimpleMDE className={s.editor} onChange={onChange} options={options} value={text} />
      <div>
        <Button type={'submit'}>{isEdit ? 'Сохранить изменения' : 'Опубликовать статью'}</Button>
        <Button as={Link} to={`/user/${user?._id}`}>
          Отменить
        </Button>
      </div>
    </form>
  )
}
