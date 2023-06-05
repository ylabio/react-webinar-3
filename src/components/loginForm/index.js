import { memo } from 'react'
import { cn as bem } from '@bem-react/classname'
import Input from '../input'
import './style.css'

function LoginForm({ onLogin, onChange, error}) {
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
          <Input theme={'form'} onChange={onChange} name={'login'}/>
        </label>
        <label>
          Пароль
          <Input theme={'form'} onChange={onChange} name={'password'}/>
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
