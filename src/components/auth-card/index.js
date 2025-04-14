import { memo, useState, useCallback } from 'react';
import Input from '../input';
import Button from '../button';

import './style.css';

function AuthCard({ onSubmit }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangeLogin = useCallback(value => setLogin(value), []);
  const handleChangePassword = useCallback(value => setPassword(value), []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!login || !password) {
      setError('Введите логин и пароль');
      return;
    }
    setError('');
    const err = await onSubmit(login, password);
    if (err) setError(err);
  };

  return (
    <form className="Login" onSubmit={handleSubmit}>
      <h1>Вход</h1>
      <div className="Login-input">
        <span>Логин</span>
        <Input value={login} placeholder={'Логин'} onChange={handleChangeLogin} timeout={null} />
      </div>
      <div className="Login-input">
        <span>Пароль</span>
        <Input
          value={password}
          type="password"
          placeholder={'Пароль'}
          onChange={handleChangePassword}
          timeout={null}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <Button style="primary" type="submit" title={'Войти'} />
    </form>
  );
}

export default memo(AuthCard);
