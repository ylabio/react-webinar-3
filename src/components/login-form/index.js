import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import Button from '../button';
import './style.css';

function LoginForm({ t, error }) {
  const cn = bem('LoginForm');

  console.log('Current translations:', {
    title: t('login.title'),
    username: t('login.username'),
    password: t('login.password')
  });

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('login.title')}</h2>
      <div className={cn('field')}>
        <label className={cn('label')}>{t('login.username')}</label>
        <Input
          type="text"
          placeholder={t('login.usernamePlaceholder')}
          theme="small"
        />
      </div>
      <div className={cn('field')}>
        <label className={cn('label')}>{t('login.password')}</label>
        <Input
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          theme="small"
        />
      </div>
      {error && <div className={cn('error')}>{error}</div>}
      <div className={cn('button')}>
        <Button
          style="primary"
          title={t('login.submit')}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default memo(LoginForm);