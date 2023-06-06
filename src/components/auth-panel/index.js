import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AuthPanel({onLogout, user, t}) {
  const cn = bem('AuthPanel');


  return(
    <div className={cn('container')}>
      <Link className={cn('link')} to="/profile">{user}</Link>
      <button onClick={onLogout} >{t('auth.logout')}</button>
    </div>
  )
}

AuthPanel.propTypes = {
  onLogout: PropTypes.func,
  user: PropTypes.string
}

export default memo(AuthPanel);
