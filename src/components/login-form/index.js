import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import Button from '../button';
import './style.css';

function LoginForm({ onLogin, error, title, t }) {
  const cn = bem('LoginForm');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(login, password);
    setLogin('');
    setPassword('');
  };

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{title}</h1>
      <form onSubmit={handleSubmit} className={cn('form')}>
        <div>
          <label className={cn('label')}>{t('user.username')}</label>
          <Input type="text" delay={0} value={login} onChange={setLogin} />
        </div>
        <div>
          <label className={cn('label')}>{t('user.password')}</label>
          <Input type="password" delay={0} value={password} onChange={setPassword} />
        </div>
        <div className={cn('error-wrap')}>{error && <p className={cn('error')}>{error}</p>}</div>
        <Button style="primary" onClick={onLogin} title={t('user.toLogin')} type="submit" />
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  error: PropTypes.string,
};

LoginForm.defaultProps = {
  onLogin: () => {},
};

export default memo(LoginForm);
