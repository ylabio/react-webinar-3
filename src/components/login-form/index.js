import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LoginForm({
  onSubmit,
  loading,
  errorText,
  headingText,
  loginLabel,
  passwordLabel,
  submitText,
  submittingText,
}) {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');

  const handle = e => {
    e.preventDefault();
    onSubmit(loginValue, password);
  };

  return (
    <form className="login-form" onSubmit={handle}>
      <h2 className="login-form__title">{headingText}</h2>

      <div className="login-form__field">
        <label htmlFor="login" className="login-form__label">
          {loginLabel}
        </label>
        <input
          id="login"
          className="login-form__input"
          type="text"
          value={loginValue}
          onChange={e => setLoginValue(e.target.value)}
          required
        />
      </div>

      <div className="login-form__field">
        <label htmlFor="password" className="login-form__label">
          {passwordLabel}
        </label>
        <input
          id="password"
          className="login-form__input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      {errorText && <div className="login-form__error">{errorText}</div>}

      <button
        type="submit"
        className="login-form__btn"
        disabled={loading}
      >
        {loading ? submittingText : submitText}
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
  headingText: PropTypes.string.isRequired,
  loginLabel: PropTypes.string.isRequired,
  passwordLabel: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
  submittingText: PropTypes.string.isRequired,
};

export default LoginForm;
