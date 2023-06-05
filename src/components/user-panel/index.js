import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {memo} from "react";


function UserPanel(props) {
  const cn = bem('UserPanel');

  return (
    <div className={cn()}>
      <Link className={cn('link')} to={'/profile'}>{props?.authData?.username}</Link>
      <button onClick={props.onLogout}>{props.t('exit')}</button>
    </div>
  )
}

UserPanel.propTypes = {
  onLogout: PropTypes.func,
  authData: PropTypes.shape({
    username: PropTypes.string
  }),
  t: PropTypes.func
}

export default memo(UserPanel);