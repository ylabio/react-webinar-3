import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';


const LoginForm = (props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    setError(null)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(null)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!login || !password) {
      return;
    }
    props.onSubmit({login, password});

  };


  useEffect(() => {
    setError(props.error);
  },[props.error])

  return (
    <div className='LoginForm'>
      <h2>{props.t('enter')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">{props.t('login')}</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={handleLoginChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">{props.t('pass')}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <button type="submit">{props.t('to.enter')}</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
  dropError: PropTypes.func,
};

export default LoginForm;
