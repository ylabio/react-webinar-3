import { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./style.css";

const LoginForm = ({ onSubmit, onChange, errorMessage, labelLogin, labelEmail, labelPassword, labelLoginButton }) => {
  
  return (
    <form className="Login-form" onSubmit={onSubmit}>
      <fieldset className="Login-fieldset">
        <h2 className="Login-title">{labelLogin}</h2>
        <label className="Login-label">{labelEmail}
          <input className="Login-input" type="text" name="email" onChange={onChange} />
        </label>
        <label className="Login-label">{labelPassword}
          <input className="Login-input" type="password" name="password" onChange={onChange} />
        </label>
        {errorMessage && <p className="Login-error">{errorMessage}</p>}
        <input className="Login-button" type="submit" value={labelLoginButton} />
      </fieldset>
    </form>
  );
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    labelLogin: PropTypes.string,
    labelEmail: PropTypes.string,
    labelPassword: PropTypes.string,
    labelLoginButton: PropTypes.string,
};

LoginForm.defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
    errorMessage: "",
}

export default memo(LoginForm);