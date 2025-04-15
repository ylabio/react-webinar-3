import { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import Button from '../button';
import './style.css';

function LoginForm({ t, error, waiting, onSubmit }) {
  const cn = bem('LoginForm');
  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(loginRef.current.value, passwordRef.current.value);
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
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
      <div className={cn('error', {hidden: !error})}>
        {error}
      </div>
      <div className={cn('button')}>
        <Button
          type="submit"
          style="primary"
          title={t('login.submit')}
          disabled={waiting}
        />
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
  waiting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

export default memo(LoginForm);