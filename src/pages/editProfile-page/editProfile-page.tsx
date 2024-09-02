import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { toLoginLogo } from '@/assets'
import avatar from '@/assets/profileimg.png'
import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/ui/controlled-input'
import { Input } from '@/components/ui/input'
import { TextArea } from '@/components/ui/textarea'
import { ControlledTextarea } from '@/components/ui/textarea/controlled-textarea'
import { Typography } from '@/components/ui/typography'
import {
  UserProfile,
  useAuthMeQuery,
  useDeleteAvatarMutation,
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
} from '@/services/auth'
import { useGetUsersQuery } from '@/services/users'
import { LiaHandPointer } from 'react-icons/lia'
import { MdOutlineAddAPhoto } from 'react-icons/md'

import s from './editProfile-page.module.scss'

export const EditProfilePage = () => {
  // const inputFileRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const {
    data: user,
    isFetching,
    isLoading,
    refetch,
  } = useAuthMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const [uploadAvatar] = useUploadAvatarMutation()
  const [deleteAvatar] = useDeleteAvatarMutation()
  const [selectedFile, setSelectedFile] = useState(null)

  const [updateUserProfile, { isError, isSuccess }] = useUpdateUserProfileMutation()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      avatarUrl: user?.avatarUrl || '',
      description: user?.description || '',
      email: user?.email || '',
      link: user?.link || '',
      name: user?.name || '',
      surname: user?.surname || '',
      typeOfSport: user?.typeOfSport || '',
      username: user?.username || '',
    },
  })

  const handleFileChange = e => {
    setSelectedFile(e.target.files[0])
  }

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar().unwrap()
      await refetch()
    } catch (err) {
      console.error('Ошибка при удалении аватара', err)
    }
  }

  const onSubmit: SubmitHandler<UserProfile> = async formData => {
    try {
      let avatarUrl = formData.avatarUrl

      if (selectedFile) {
        const uploadData = new FormData()

        uploadData.append('image', selectedFile)

        const { url } = await uploadAvatar(uploadData).unwrap()

        avatarUrl = url
      }

      await updateUserProfile({ ...formData, avatarUrl }).unwrap()
      await refetch()

      reset({
        ...formData,
        avatarUrl,
      })

      navigate(`/user/${user?._id}`, { replace: true })
    } catch (err) {
      console.error('ошибка при обновлении профиля пользователя', err)
    }
  }

  useEffect(() => {
    console.log('isFetching:', isFetching, 'isLoading:', isLoading)
  }, [isFetching, isLoading])

  return (
    <div className={s.container}>
      <div className={s.card}>
        <img alt={'logo'} className={s.logo} src={toLoginLogo} />
        <Typography className={s.text} variant={'large'}>
          измени/дополни информацию о себе
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'username'}
            name={'username'}
            placeholder={user?.username}
            type={'text'}
          ></ControlledInput>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'Имя'}
            name={'name'}
            placeholder={user?.name}
          ></ControlledInput>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'Фамилия'}
            name={'surname'}
            placeholder={user?.surname}
          ></ControlledInput>
          <ControlledTextarea
            className={s.textareaStyle}
            control={control}
            label={'о себе'}
            name={'description'}
            placeholder={user?.description || '...'}
            rules={{
              maxLength: {
                message: 'описание не должно превышать 200 символов',
                value: 200,
              },
            }}
          />

          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'e-mail'}
            name={'email'}
            placeholder={user?.email}
          ></ControlledInput>
          <div className={s.addAvatarWrap}>
            <img
              alt={'avatar'}
              className={s.avatarStyle}
              src={
                user?.avatarUrl
                  ? `http://localhost:4411${user.avatarUrl}`
                  : `https://robohash.org/${user?.username}.png`
              }
            />
            <div>
              <Input onChange={handleFileChange} type={'file'} />
              {user && user.avatarUrl ? (
                <Button onClick={handleDeleteAvatar}>
                  удалить аватар <MdOutlineAddAPhoto />
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            label={'ссылка на соцсети'}
            name={'link'}
            placeholder={user?.link || 'https://t.me/umkamedvezhatova'}
          ></ControlledInput>
          <Button className={s.btnStyle} type={'submit'}>
            сохранить изменения
          </Button>
        </form>
        <Typography className={s.text} variant={'large'}>
          оставить без изменений и
        </Typography>
        <Button as={Link} className={s.btnStyle} to={`/user/${user?._id}`} variant={'link'}>
          выйти
        </Button>
        <LiaHandPointer className={s.pointer} size={25} />
        {/* <Input placeholder={'оформить аватар'} type={'file'} /> */}
      </div>
    </div>
  )
}
