import { memo, useCallback, useRef } from 'react'; // Добавили useRef
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Input from '../input';
import Button from '../button';
import './style.css';

function LoginForm({ t }) {
  const cn = bem('LoginForm');
  const store = useStore();
  const loginRef = useRef(); // Создали ref для логина
  const passwordRef = useRef(); // Создали ref для пароля
  
  const select = useSelector(state => ({
    error: state.user.error,
    waiting: state.user.waiting
  }));

  const callbacks = {
    onSubmit: useCallback(async (e) => {
      e.preventDefault();
      const login = loginRef.current.value; // Получаем значение через ref
      const password = passwordRef.current.value; // Получаем значение через ref
      const success = await store.actions.user.signIn(login, password);
      if (success) {
        await store.actions.user.load();
      }
    }, [store])
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h2 className={cn('title')}>{t('login.title')}</h2>
      <div className={cn('field')}>
        <label className={cn('label')}>{t('login.username')}</label>
        <Input
          inputRef={loginRef} // Передаем ref в Input
          type="text"
          placeholder={t('login.usernamePlaceholder')}
          theme="small"
          required
        />
      </div>
      <div className={cn('field')}>
        <label className={cn('label')}>{t('login.password')}</label>
        <Input
          inputRef={passwordRef} // Передаем ref в Input
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          theme="small"
          required
        />
      </div>
      {select.error && (
        <div className={cn('error')}>{select.error}</div>
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