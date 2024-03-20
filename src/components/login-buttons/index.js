import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import UserData from '../user-data';

function LoginButtons(props) {

  const cn = bem('LoginButtons');

  return (
    <div className={cn()}>
      {!props.userData.profile && <Link className={cn('link')} to={props.loginLink}>{props.loginTitle}</Link>}
      {props.userData.profile && <UserData title={props.logoutTitle} userData={props.userData} link={props.profileLink} onLogout={props.onLogout}></UserData>}
    </div>
  )
}

LoginButtons.propTypes = {
  userData: PropTypes.object,
  loginLink: PropTypes.string,
  profileLink: PropTypes.string,
  loginTitle: PropTypes.string,
  logoutTitle: PropTypes.string,
  onLogout: PropTypes.func,
}

LoginButtons.defaultProps = {
  onLogout: () => {},
}

export default memo(LoginButtons);