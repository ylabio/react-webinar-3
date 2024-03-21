import React, { memo } from 'react'
import PropTypes from "prop-types";
import './style.css'
import { Link } from 'react-router-dom';

const LoginContent = ({isLoggedIn, username, onLogOut, t}) => {
  const callbacks = {
    onLogOut: () => onLogOut()
  }
  
  return (
    <>
      {isLoggedIn ? (
        <>
          <Link to='/profile' className='Login-profile-link'>{username}</Link>
          <button className='Login-btn--logout' onClick={callbacks.onLogOut}>{t('loginHeader.logout')}</button>
        </>
      ) : (
        <Link className="Login-btn--login" to='/login'>{t('loginHeader.login')}</Link>
      )}
    </>
  )
}

LoginContent.propTypes = {
  isLoggedIn: PropTypes.bool,
  username: PropTypes.string,
  logOut: PropTypes.func,
  t: PropTypes.func,
}

LoginContent.defaultProps = {
  onLogOut: () => {
  },
  t: (text) => text
}

export default memo(LoginContent)