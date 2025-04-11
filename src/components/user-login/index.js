import React, { memo, useEffect, useState } from 'react';
import Input from '../input';
import Button from '../button';
import './style.css';

const UserLogin = ({ onSubmit, error, clearError }) => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (value, name) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    clearError();
  };

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  return (
    <div className="UserLogin">
      <h2 className="UserLogin-title">Вход</h2>
      <form className="UserLogin-form" onSubmit={handleSubmit}>
        <div className="UserLogin-login">
          <label className="UserLogin-label" htmlFor="login">
            Логин
          </label>
          <Input
            id="login"
            name="login"
            placeholder={'Введите логин'}
            type="text"
            value={formData.login}
            delay={0}
            theme="big"
            onChange={value => handleChange(value, 'login')}
          />
        </div>

        <div className="UserLogin-password">
          <label className="UserLogin-label" htmlFor="password">
            Пароль
          </label>
          <Input
            id="password"
            name="password"
            placeholder={'Введите пароль'}
            type="password"
            value={formData.password}
            delay={0}
            theme="big"
            onChange={value => handleChange(value, 'password')}
          />
        </div>

        {error && <p className="UserLogin-error">{error}</p>}

        <Button title="Войти" style="primary" type="submit" />
      </form>
    </div>
  );
};

export default memo(UserLogin);
