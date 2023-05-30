import { memo } from 'react'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import { cn as bem } from '@bem-react/classname'
import './style.css'

const Language = () => {
  const cn = bem('Language')

  const store = useStore()

  const select = useSelector((state) => ({
    lang: state.language.lang,
  }))

  const callbacks = {
    onChangeLang: (e) => store.actions.language.onChangeLang(e.target.value),
  }

  return (
    <div className={cn()}>
      <label>
        <select value={select.lang} onChange={callbacks.onChangeLang}>
          <option value='ru'>RU</option>
          <option value='en'>EN</option>
        </select>
      </label>
    </div>
  )
}

export default memo(Language)
