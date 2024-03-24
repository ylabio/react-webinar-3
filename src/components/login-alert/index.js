import { memo } from 'react'
import { Link } from 'react-router-dom'

function LoginAlert({text}) {
  return (
    <p><Link to={'/login'}>Войдите</Link>, чтобы иметь возможность {text}</p>
  )
}

export default memo(LoginAlert)