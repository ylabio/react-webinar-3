import { memo } from 'react'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function LoginForm({ onLogin, onChange, error }) {
  const cn = bem('LoginForm')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} className={cn('form')}>
        <label>
          Логин
          <input
            onChange={(e) => onChange(e, (name = 'login'))}
            className={cn('input')}
          />
        </label>
        <label>
          Пароль
          <input
            type='password'
            onChange={(e) => onChange(e, (name = 'password'))}
            className={cn('input')}
            placeholder='.'
          />
        </label>
        {error && <p className={cn('error')}>{error}</p>}
        <button type="submit" className={cn('button')}>
          Войти
        </button>
      </form>
    </div>
  )
}

export default memo(LoginForm)
