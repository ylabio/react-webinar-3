import React, { memo, useCallback, useEffect, useState } from 'react';
import './style.css';
import Input from '../input';
import Button from '../button';
import login from "../../app/login";
import Spinner from "../spinner";

const LoginForm = ({
  email = '',
  password = '',
  setEmail = (email) => {},
  setPassword = (password) => {},
  errorMessage = '',
  onSubmit = (email, password) => {},
  loading = false,
}) => {

  const callbacks = {
    onClick: useCallback(() => {
      onSubmit(email, password);
    }, [email, password]),
  };

  return (
    <div className="login-form">
      <h1>Вход</h1>
      <p className={'login-form_input-label'}>Логин</p>
      <Input
        value={email}
        onChange={setEmail}
        placeholder={'Введите логин'}
        theme={'small'}
      />
      <p className={'login-form_input-label'}>Пароль</p>
      <Input
        type={'password'}
        value={password}
        onChange={setPassword}
        placeholder={'Введите пароль'}
        theme={'small'}
      />
      <p className={'login-form_error-label'}>{errorMessage}</p>
      <Spinner active={loading} >
        <Button onClick={callbacks.onClick} style="primary" title="Войти" />
      </Spinner>
    </div>
  );
};

export default memo(LoginForm);
