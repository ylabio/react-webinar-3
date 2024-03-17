import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';


const LoginForm = (props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(props.error);


  console.log(error)

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    setError('')
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('')
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!login || !password) {
      return;
    }
    props.onSubmit({login, password});
  };


  useEffect(() => {
    setError(props.error)
  }, [props.error])

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
        {error && <div style={{color: 'red'}}>{props.t(error)}</div>}
        <button type="submit">{props.t('to.enter')}</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default LoginForm;
