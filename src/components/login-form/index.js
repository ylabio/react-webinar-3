import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input'
import Button from '../button'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const cn = bem('LoginForm');
  const navigate = useNavigate()

  const [signOptions, setSignOptions] = useState({login: '', password: ''})

  const callbacks = {
    // Установка логина
    setLogin: useCallback(newLogin => setSignOptions(prev => (
      {...prev, login: newLogin}
    )),[]),
    
    // Установка пароля
    setPassword: useCallback(newPass => setSignOptions(prev => (
      {...prev, password: newPass}
    )),[]),
    
    // Отправка формы 
    onSubmit: useCallback((e) => {
      e.preventDefault()
      console.log('Авторизация успешна')
      navigate('/')
    })
  }

  const options = {
    login: {
      value: signOptions.login,
      name: 'login',
      type: 'text',
      placeholder: 'Введите логин',
      theme: 'small'
    },
    password: {
      value: signOptions.password,
      name: 'password',
      type: 'password',
      placeholder: 'Введите пароль',
      theme: 'small'
    },
    button: {
      title: 'Войти',
      style: 'primary',
      type: 'submit'
    }
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <form className={cn('body')} method='POST' onSubmit={callbacks.onSubmit}>
        <div className={cn('prop-wrapper', {error: 'active'})}>
          <div className={cn('prop')}>
            <label className={cn('label')}>Логин</label>
            <Input {...options.login} onChange={callbacks.setLogin}/>  
          </div>
          <div className={cn('prop')}>
            <label className={cn('label')}>Пароль</label>
            <Input {...options.password} onChange={callbacks.setPassword}/> 
          </div>
          <div className={cn('error', {message: 'active'})}>Текст ошибки</div>
        </div>
        <Button {...options.button}/>
      </form>
    </div>
  );
}

export default memo(LoginForm);
