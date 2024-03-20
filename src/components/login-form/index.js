import React, {useEffect, useLayoutEffect, useState} from 'react';
import './style.css'
import SideLayout from "../side-layout";
import PropTypes from "prop-types";

const LoginForm = ({ onClick, error, t }) => {
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')

  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (error) setShowError(true)
  }, [error])

  useEffect(() => {
    setShowError(false)
  }, [])

  return (
    <SideLayout side='start' padding='medium'>
      <div className='LoginForm'>
        <span className='LoginForm-header'>{t('user.login')}</span>
        <div className='LoginForm-login'>
          <label htmlFor="user-login">{t('user.loginInput')}</label>
          <input id='user-login' type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
        </div>
        <div className='LoginForm-pass'>
          <label htmlFor="user-pass">{t('user.passInput')}</label>
          <input id='user-pass' type="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
        </div>
        {showError &&
          error?.map((issue, i) => (
            <div key={i} className='LoginForm-error'>{issue.message}</div>
          ))
        }
        <button className='LoginForm-btn' onClick={() => onClick(login, pass)}>{t('user.enter')}</button>
      </div>
    </SideLayout>
  );
};

LoginForm.propTypes = {
  onClick: PropTypes.func,
  error: PropTypes.array,
  t: PropTypes.func
}

LoginForm.defaultProps = {
  onClick: () => {}
}

export default LoginForm;
