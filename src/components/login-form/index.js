import React, {useState} from 'react';
import './style.css'
import SideLayout from "../side-layout";
import PropTypes from "prop-types";

const LoginForm = ({ onClick, error }) => {
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')

  return (
    <SideLayout side='start' padding='medium'>
      <div className='LoginForm'>
        <span className='LoginForm-header'>Вход</span>
        <div className='LoginForm-login'>
          <label htmlFor="user-login">Логин</label>
          <input id='user-login' type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
        </div>
        <div className='LoginForm-pass'>
          <label htmlFor="user-pass">Пароль</label>
          <input id='user-pass' type="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
        </div>
        {error &&
          <div className='LoginForm-error'>{error}</div>
        }
        <button className='LoginForm-btn' onClick={() => onClick(login, pass)}>Войти</button>
      </div>
    </SideLayout>
  );
};

LoginForm.propTypes = {
  onClick: PropTypes.func,
  error: PropTypes.string,
}

LoginForm.defaultProps = {
  onClick: () => {}
}

export default React.memo(LoginForm);
