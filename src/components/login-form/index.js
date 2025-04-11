import { memo, useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input';
import Button from '../button';
import useStore from '../../hooks/use-store';

function LoginForm({ t }) {
  const store = useStore();
  const cn = bem('LoginForm');

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const callbacks = {
    login: useCallback(
      ({ login, pass }) => {
        return store.actions.user.loginUser({ login, pass });
      },
      [store],
    ),
  };

  async function loginFunc() {
    const response = await callbacks.login({ login, pass });
    if (response.error) {
      setError(response.error);
    } else {
      setError('');
    }
  }

  return (
    <div className={cn()}>
      <span className={cn('title')}>{t('login')}</span>
      <div className={cn('container')}>
        <div className={cn('fields')}>
          <div className={cn('field')}>
            <span className={cn('label')}>Логин</span>
            <Input onChange={setLogin} placeholder={'Введите логин'}></Input>
          </div>
          <div className={cn('field')}>
            <span className={cn('label')}>Логин</span>
            <Input onChange={setPass} placeholder={'Введите пароль'}></Input>
          </div>
          {error && <span className={cn('error')}>{error}</span>}
        </div>
      </div>
      <Button
        onClick={loginFunc}
        className={cn('button')}
        style={'primary'}
        title={t('login')}
      ></Button>
    </div>
  );
}

LoginForm.propTypes = {};

export default memo(LoginForm);
