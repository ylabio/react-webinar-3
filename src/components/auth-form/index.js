import { memo, useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import Button from '../button';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import './style.css';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const cn = bem('Auth');
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    error: state.auth.error,
  }));

  const callbacks = {
    //Авторизация
    signIn: useCallback((login, password) => store.actions.auth.signIn(login, password), [store]),
  };

  // login: 'test_1', password: '123456',
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const handleChange = name => value => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await callbacks.signIn(formData.login, formData.password);
    if (data?.success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Вход</h3>
      <form className={cn('form')} onSubmit={handleSubmit}>
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
          {select.error &&
            select.error.map((err, index) => (
              <span key={index} className={cn('error')}>
                {err.message}
              </span>
            ))}
        </div>
        <Button title="Войти" style="primary" type="submit" />
      </form>
    </div>
  );
}

export default memo(AuthForm);
