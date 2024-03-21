import React, {useRef} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AuthorizationForm({onSubmit, error, t}) {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (loginRef !== null && passwordRef !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      })
    }
  }

  const cn = bem('AuthorizationForm');

  return (
    <div className={cn()}>
      <div className={cn('title')}>Вход</div>
      <form className={cn('form')} onSubmit={handleSubmitForm}>
        <div className={cn('group')}>
          <label htmlFor='login'>Логин</label>
          <input
            ref={loginRef}
            name='login'
            required
          />
        </div>
        <div className={cn('group')}>
          <label htmlFor='password'>Пароль</label>
          <input
            ref={passwordRef}
            name='password'
            required
          />
        </div>
        <span className={cn('error')}>{error}</span>
        <button>Войти</button>
      </form>
    </div>
  );
}

export default AuthorizationForm;