import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import Button from '../button';

import './style.css';

function AuthForm({ error, handleSubmit }) {
  const cn = bem('Auth');

  const [formData, setFormData] = useState({
    login: 'test_1',
    password: '123456',
  });

  const handleChange = name => value => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = event => {
    event.preventDefault();
    handleSubmit(formData.login, formData.password);
  };

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Вход</h3>
      <form className={cn('form')} onSubmit={event => handleClick(event)}>
        <div className={cn('field')}>
          <span className={cn('label')}>Логин</span>
          <Input
            value={formData.login}
            onChange={handleChange('login')}
            type="text"
            name="login"
            placeholder={'Введите логин'}
          />
        </div>
        <div className={cn('field')}>
          <span className={cn('label')}>Пароль</span>
          <Input
            value={formData.password}
            onChange={handleChange('password')}
            type="text"
            name="password"
            placeholder={'Введите пароль'}
          />
        </div>
        <div className={cn('errors')}>
          <span className={cn('error')}>{error}</span>
        </div>
        <Button title="Войти" style="primary" type="submit" />
      </form>
    </div>
  );
}

export default memo(AuthForm);
