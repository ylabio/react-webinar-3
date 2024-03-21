import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {useNavigate} from 'react-router-dom';
import './style.css';


function LoginForm (props) {

  const cn = bem('LoginForm');

  const router = useNavigate();

  const [authUser, setAuthUser] = useState({login: '', password: ''});

  async function onClick (ev) {
    ev.preventDefault();
    const result = await props.loginUser(authUser);
    if (result) {
      result > 1 
        ? router(props.linkBack, {replace: true}) 
        : router(props.linkMain, {replace: true})
    }
    
  }

  const onChange = (ev, param) => {
    setAuthUser({...authUser, [param]: ev.target.value})
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.signIn}</h2>
      <form className={cn('form')}>
        <label htmlFor='login'>{props.textLogin}</label>
        <input 
          className={cn('input')} 
          type='text' 
          id='login' 
          value={authUser.login} 
          onChange={(ev) => onChange(ev, 'login')}
        >
        </input>
        <label htmlFor='password'>{props.password}</label>
        <input 
          className={cn('input')} 
          type='password' 
          id='password' 
          value={authUser.password} 
          onChange={(ev) => onChange(ev, 'password')}
        >
        </input>
        <div className={cn('error')}>{props.error}</div>
        <button className={cn('btn')} onClick={onClick}>{props.logIn}</button>
      </form>
    </div>
  );

}

LoginForm.propTypes = {
  signIn: PropTypes.string,
  textLogin: PropTypes.string,
  password: PropTypes.string,
  logIn: PropTypes.string,
  linkBack: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  linkMain: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  loginUser: PropTypes.func
}

LoginForm.defaultProps = {
  loginUser: () => {
  },
}

export default memo(LoginForm);