import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm(props) {
  const cn = bem('LoginForm');
  return (
    <div className={cn()}>
      <div className={cn('title')}>Вход</div>
      <form onSubmit={(e) => props.handleSignIn(e)}>
        <div className={cn('form-group')}>
          <label htmlFor='login'>Логин</label>
          <input type='text' id='login' name='login' required />
        </div>
        <div className={cn('form-group')}>
          <label htmlFor='password'>Пароль</label>
          <input type='password' id='password' name='password' required />
        </div>
        {props.errorMessage &&
          <div className={cn('error')}>{props.errorMessage}</div>
        }
        <button type='submit'>Войти</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  t: PropTypes.func,
  handleSignIn: PropTypes.func,
};

LoginForm.defaultProps = {
  errorMessage: '',
  t: (text) => text,
  handleSignIn: () => {},
}

export default memo(LoginForm);
