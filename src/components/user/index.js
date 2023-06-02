import { memo } from 'react'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function User(props) {
  const cn = bem('User')
  return <div className={cn()}>
    <h2>Профиль</h2>
    <p>Имя:</p>
    <p>Телефон:</p>
    <p>email:</p>
  </div>
}
export default memo(User)
