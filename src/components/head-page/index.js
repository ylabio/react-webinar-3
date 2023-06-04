import { memo } from 'react'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import { Link } from 'react-router-dom'

function HeadPage({ authorization, exit, userName }) {
  const cn = bem('HeadPage')
  const onDelete = () => {
    authorization && exit()
  }
  return (
    <div className={cn('wrap')}>
      {authorization && (
        <Link to="/user/123" className={cn('link')}>
          {userName}
        </Link>
      )}
      <button className={cn('button')} onClick={onDelete}>
        <Link to={authorization ? '#' : '/login'} className={cn('link-button')}>
          {authorization ? 'Выход' : 'Вход'}
        </Link>
      </button>
    </div>
  )
}

export default memo(HeadPage)
