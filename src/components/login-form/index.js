import { memo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Input from '../input';
import Button from '../button';
import './style.css';

function LoginForm({ t }) {
  const cn = bem('LoginForm');
  const store = useStore();
  const navigate = useNavigate();
  const loginRef = useRef();
  const passwordRef = useRef();
  
  const select = useSelector(state => ({
    error: state.user.error,
    waiting: state.user.waiting
  }));

  const callbacks = {
    onSubmit: useCallback(async (e) => {
      e.preventDefault();
      const login = loginRef.current.value;
      const password = passwordRef.current.value; 
      console.log('Trying to auth with:', { 
        login: loginRef.current.value,
        password: passwordRef.current.value 
      });
      const success = await store.actions.user.signIn(login, password);
      if (success) {
        await store.actions.user.load();
        navigate('/');
      } else {
        console.log('Auth failed, current error:', store.getState().user.error);
      }
    }, [store])
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h2 className={cn('title')}>{t('login.title')}</h2>
      <div className={cn('field')}>
        <label className={cn('label')}>{t('login.username')}</label>
        <Input
          inputRef={loginRef} 
          type="text"
          placeholder={t('login.usernamePlaceholder')}
          theme="small"
          required
        />
      </div>
      <div className={cn('field')}>
        <label className={cn('label')}>{t('login.password')}</label>
        <Input
          inputRef={passwordRef} 
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          theme="small"
          required
        />
      </div>
      {select.error && (
        <div className={cn('error')}>
          {select.error}
        </div>
      )}
      <div className={cn('button')}>
        <Button
          type="submit"
          style="primary"
          title={t('login.submit')}
          disabled={select.waiting}
        />
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired
};

export default memo(LoginForm);