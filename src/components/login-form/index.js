import React, { useCallback, useState } from 'react';
import Input from '../../components/input';
import 'style.css';
import useStore from '../../hooks/use-store';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const store = useStore();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const callbacks = {
    login: useCallback(
      ({ login, password }) => {

        return store.actions.user.login({ login, password });
      },
      [store],
    ),
  };

  async function handleLogin() {
    const response = await callbacks.login({ login, password });
    console.log(response.error);
    
    if (response.error) {
      setError(response.error);
    } else {
      setError('');
      navigate('/profile');
    }

  }
  return (
    <div className="LoginForm">
      <h1 className="LoginForm-title">Вход</h1>
      <div className="LoginForm-inputs">
        <ladel className="LoginForm-label">
          Логин
          <Input onChange={setLogin} placeholder={'Введите логин'} />
        </ladel>
        <ladel className="LoginForm-label">
          Пароль
          <Input onChange={setPassword} placeholder={'Введите пароль'} />
        </ladel>
        {error && <span className="LoginForm-error">{error}</span>}
      </div>
      <Button
        className="LoginForm-button"
        onClick={handleLogin}
        style={'primary'}
        title={'Войти'}
      ></Button>
    </div>
  );
};

export default LoginForm;
