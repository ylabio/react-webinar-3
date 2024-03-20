import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { Link, useNavigate } from 'react-router-dom'

function AccountBlock({t, onLogout, username, setUrl}) {
  const navigate = useNavigate()

  const login = () => {
    setUrl(window.location.pathname)
    navigate('/login')
  }

  if (username) {
    return (
      <div className='AccountBlock'>
        <Link to={'/profile'}>{username}</Link>
        <button onClick={onLogout}>{t('account.logout')}</button>
      </div>
    )
  }

  return (
    <div className='AccountBlock'>
      <button onClick={login}>{t('account.login')}</button>
    </div>
  )
}

AccountBlock.propTypes = {
  t: PropTypes.func,
  onLogout: PropTypes.func,
  username: PropTypes.string
};

export default memo(AccountBlock);
