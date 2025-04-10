import { memo, useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input'
import Button from '../button'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'

function LoginForm() {
  const cn = bem('LoginForm');
  const [signOptions, setSignOptions] = useState({login: '', password: ''})

  const store = useStore()
  const select = useSelector(state => ({
    user: state.user.data,
    error: state.user.error,
  }))

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
      store.actions.user.auth(signOptions)
    })
  }

  const { t } = useTranslate()

  const options = {
    login: {
      value: signOptions.login,
      name: 'login',
      type: 'text',
      placeholder: t("loginForm.loginPlaceholder"),
      theme: 'small'
    },
    password: {
      value: signOptions.password,
      name: 'password',
      type: 'password',
      placeholder: t("loginForm.passwordPlaceholder"),
      theme: 'small'
    },
    button: {
      title: t('loginForm.action'),
      style: 'primary',
      type: 'submit'
    }
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('userActions.login')}</h2>
      <form className={cn('body')} method='POST' onSubmit={callbacks.onSubmit}>
        <div 
          className={cn('prop-wrapper', select.error && {error: 'active'})}>
          <div className={cn('prop')}>
            <label className={cn('label')}>{t('loginForm.login')}</label>
            <Input {...options.login} onChange={callbacks.setLogin}/>  
          </div>
          <div className={cn('prop')}>
            <label className={cn('label')}>{t('loginForm.password')}</label>
            <Input {...options.password} onChange={callbacks.setPassword}/> 
          </div>
          <div 
            className={cn('error', select.error && { message: 'active'} )}>{select.error}</div>
        </div>
        <Button {...options.button}/>
      </form>
    </div>
  );
}

export default memo(LoginForm);
