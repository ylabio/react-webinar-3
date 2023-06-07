import React, {memo, useState} from 'react';
import './style.css';

function LoginForm({ onSubmit, error }) {
  const [form, setForm] = useState({
    login: '',
    password: ''
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setForm(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(form)

    setForm({
      login: '',
      password: ''
    })
  }

  return (
    <form className={'LoginForm'} onSubmit={handleSubmit}>
      <h2 className={'LoginForm-title'}>Вход</h2>
      <label>
        Логин
        <input type="text" name={'login'} onChange={handleInput} required/>
      </label>
      <label>
        Пароль
        <input type="password" name={'password'} onChange={handleInput} required/>
      </label>
      <span className={'LoginForm-error'}>{error}</span>
      <button type={'submit'}>Вход</button>
    </form>
  );
};

export default memo(LoginForm);