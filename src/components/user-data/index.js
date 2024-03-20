import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from 'react-router-dom';

function UserData(props) {

  const cn = bem('UserData');

  return (
    <div className={cn()}>
      <Link to={props.link}>{props.userData.profile?.name}</Link>
      <button className={cn('button')} onClick={props.onLogout}>{props.title}</button>
    </div>
  )
}

UserData.propTypes = {
  userData: PropTypes.object,
  title: PropTypes.string,
  link: PropTypes.string,
  onLogout: PropTypes.func,
}

UserData.defaultProps = {
  onLogout: () => {}
}

export default memo(UserData);