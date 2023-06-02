import { memo } from 'react'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import { Link } from 'react-router-dom'

function HeadPage({ token, userName = 'user' }) {
  const cn = bem('HeadPage')

  return (
    <div className={cn('wrap')}>
      {token !== null && (
        <Link to="/user/123" className={cn('link')}>
          {userName}
        </Link>
      )}
      <button className={cn('button')}>
        <Link to="/login" className={cn('link-button')}>
          {token ? 'Выход' : 'Вход' }
        </Link>
      </button>
    </div>
  )
}

export default memo(HeadPage)
