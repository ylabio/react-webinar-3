import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit, t }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!login || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    setError('');
    onSubmit({ login, password });

  };

  return (
    <form className='LoginForm' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login">{t('login')}:</label>
        <input
          type="text"
          id="login"
          value={login}
          onChange={handleLoginChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">{t('pass')}:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">{t('enter')}</button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
