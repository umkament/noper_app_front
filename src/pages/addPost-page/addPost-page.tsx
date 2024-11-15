import { useMemo, useRef, useState } from 'react'
import { React } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'

import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/ui/controlled-input'
import { Input } from '@/components/ui/input'
import { useAuthMeQuery } from '@/services/auth'
import {
  PostInterface,
  useCreatePostMutation,
  useGetPostQuery,
  useUploadImageMutation,
} from '@/services/posts'
import { useGetUserQuery } from '@/services/users'
import { MdAddAPhoto, MdOutlineAddAPhoto } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import 'simplemde/dist/simplemde.min.css'

import s from './addPost-page.module.scss'

export const AddPostPage = () => {
  const { postId } = useParams<{ postId: string }>()
  const [createPost] = useCreatePostMutation()
  const [uploadImage] = useUploadImageMutation()
  const { data: post } = useGetPostQuery(postId, { skip: !postId })
  const { data: user } = useAuthMeQuery()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState<string>(post?.imageUrl || '')

  const inputFileRef = useRef<HTMLInputElement>(null)

  //настройки редактора
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
  const handleDeletePostImage = async () => {
    setImagePreview('')
    setSelectedFile(null)
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    try {
      let imageUrl = imagePreview

      // 1. Сначала загружаем изображение, если оно есть
      if (selectedFile) {
        const formData = new FormData()

        formData.append('image', selectedFile)

        const imageResponse = await uploadImage(formData).unwrap()

        console.log('imageResponse', imageResponse)

        imageUrl = imageResponse.url // Предполагаем, что сервер вернет URL загруженного изображения
      }
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      // 2. Отправляем текстовые данные поста
      const postData = {
        // Добавляем URL загруженного изображения
        tags: tagsArray, // Преобразуем строку тегов в массив
        text,
        title,
      }

      console.log('postData', postData)

      const postResponse = await createPost({ ...postData, imageUrl }).unwrap()

      console.log('postResponse', postResponse)
      // Переход на страницу нового поста
      navigate(`/post/${postResponse._id}`)
    } catch (error) {
      console.error('Ошибка при создании поста:', error)
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
            удалить изображение <MdOutlineAddAPhoto />
          </Button>
        ) : (
          <Button onClick={handleButtonClick} type={'button'}>
            иллюстрировать статью <MdAddAPhoto />
          </Button>
        )}
      </div>
      <Input
        className={s.title}
        label={'Заглавие статьи'}
        name={'title'}
        onChange={e => setTitle(e.target.value)}
        placeholder={'придумай заголовок для своей статьи'}
      />
      <Input
        className={s.tags}
        label={'тэги'}
        name={'tags'}
        onChange={e => setTags(e.target.value)}
        placeholder={'если тегов больше, чем один, добавь запятую'}
      />
      <SimpleMDE className={s.editor} onChange={onChange} options={options} value={text} />
      <div>
        <Button type={'submit'}>опубликовать статью</Button>
        <Button as={Link} to={`/user/${user?._id}`}>
          выйти
        </Button>
      </div>
    </form>
  )
}
