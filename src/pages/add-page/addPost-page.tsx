import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MdAddAPhoto } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import 'simplemde/dist/simplemde.min.css'

import s from './addPost-page.module.scss'

export const AddPostPage = () => {
  const uniqueId = useMemo(() => uuidv4(), [])
  const inputFileRef = useRef(null)
  const [text, setText] = useState('')
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
    // Триггерим клик на невидимом инпуте
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  const handleChangeFile = (event: any) => {
    // Обработка выбранных файлов
    const files = event.target.files

    console.log(files)
  }

  return (
    <div className={s.container}>
      <div className={s.illustrator}>
        <Button className={s.buttonStyle} onClick={handleButtonClick}>
          иллюстрировать статью <MdAddAPhoto />
        </Button>
        <input hidden onChange={handleChangeFile} ref={inputFileRef} type={'file'} />
      </div>
      <Input className={s.title} placeholder={'Заголовок статьи...'} />
      <Input className={s.tags} placeholder={'#тэги'} />
      <SimpleMDE className={s.editor} onChange={onChange} options={options} value={text} />
      <div>
        <Button>опубликовать статью</Button>
        <Button as={Link} to={'/user'}>
          выйти
          {/* заменить ссылку выйти на профайл в дальнейшем */}
        </Button>
      </div>
    </div>
  )
}
