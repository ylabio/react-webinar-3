import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {useState} from 'react';

import './style.css';

const defaultFormFields = {
  login: '',
  password: '',
};

function AuthPage(props) {
  const [error, setError] = useState(null);

  const cn = bem('AuthPage');

  const [formFields, setFormFields] = useState(defaultFormFields);
  const {login, password} = formFields;

  const setFormToEmpty = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = await props.onSubmit(login, password);
      setFormToEmpty();
      props.onRedirect();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormFields({...formFields, [name]: value});
  };

  return (
    <div className={cn()}>
      <h2 className={cn('bold', 'title')}>Вход</h2>
      <form className={cn('form')} onSubmit={handleSubmit}>
        <div className={cn('group')}>
          <label className={cn('label')} htmlFor="login">
            Логин
          </label>
          <input
            className={cn('input')}
            type="text"
            onChange={handleInput}
            required
            name="login"
            id="login"
            value={login}
          />
        </div>
        <div className={cn('group')}>
          <label className={cn('label')} htmlFor="password">
            Пароль
          </label>
          <input
            className={cn('input')}
            type="password"
            onChange={handleInput}
            required
            name="password"
            id="password"
            value={password}
          />
        </div>
        {error ? <div className={cn('error')}>{error}</div> : ''}
        <div className={cn('button')}>
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
}

AuthPage.propTypes = {
  onSubmit: PropTypes.func,
  onRedirect: PropTypes.func,
};

AuthPage.defaultProps = {
  onSubmit: () => {},
  onRedirect: () => {},
};

export default memo(AuthPage);
