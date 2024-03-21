import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link, useNavigate} from 'react-router-dom';
import './style.css';

function ToggleLogin (props) {

  const cn = bem('ToggleLogin');

  const router = useNavigate();

  async function onClick (ev) {
    ev.preventDefault();
    await props.signOutUser();
    router(props.link);
  }

  if (!props.authLogin) {
    return (
      <div className={cn('action-link')}>
          <Link className={cn('link')} to={props.link}>{props.signIn}</Link>
      </div>
    );
  }
  return (
    <div className={cn('action-btn')}>
        <button className={cn('btn')} onClick={onClick}>{props.signOut}</button>
    </div>
  );
 
}

ToggleLogin.PropTypes = {
  signIn: PropTypes.string,
  signOut: PropTypes.string,
  link: PropTypes.string,
  authLogin: PropTypes.bool,
  signOutUser: PropTypes.func
}

ToggleLogin.defaultProps = {
  signOutUser: () => {
  },
}

export default memo(ToggleLogin);