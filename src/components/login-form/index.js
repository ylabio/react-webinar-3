import { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm(props) {
  const { 
    username, 
    password, 
    error, 
    setUsername, 
    setPassword, 
    signIn = () => {} 
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(username, password);
  };

  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        Вход
      </div>
      <form className={cn('form')} onSubmit={handleSubmit}>
        <div className={cn('inputs')}>
          <label htmlFor="username">Логин</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Введите логин"
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={cn('inputs')}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Введите пароль"
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error &&
            <label className={cn('error')}>{error}</label>
          }
        </div>
        <Button style="primary" type="submit" title="Войти" />
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  signIn: PropTypes.func,
};

export default memo(LoginForm);
