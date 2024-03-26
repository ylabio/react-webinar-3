import { memo } from 'react'
import { Link } from 'react-router-dom'

function LoginAlert({text, children}) {
  return (
    <p><Link to={'/login'}>Войдите</Link>, чтобы иметь возможность {text} {children}</p>
  )
}

export default memo(LoginAlert)