import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import Button from '../button';
import './style.css';

function LoginForm({ t, login, password, error, onChangeLogin, onChangePassword, onSubmit }) {
  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t('menu.login')}</h1>
      <form className={cn('form')} onSubmit={onSubmit}>
        <div className={cn('input-container')}>
          <div className={cn('input-group')}>
            <label className={cn('label')}>{t('login.email')}</label>
            <Input
              value={login}
              onChange={onChangeLogin}
              placeholder={t('login.placeholder')}
            />
          </div>
          <div className={cn('input-group')}>
            <label className={cn('label')}>{t('login.password')}</label>
            <Input
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder={t('login.password.placeholder')}
            />
          </div>
        </div>
        <div className={cn('error-container')}>
          {error && <div className={cn('error')}>{error}</div>}
        </div>
        <div className={cn('button-container')}>
          <Button
            type="submit"
            style="primary"
            title={t('login.submit')}
            disabled={!login || !password}
          />
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChangeLogin: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default memo(LoginForm);
