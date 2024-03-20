import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfilePage(props) {

  const cn = bem('ProfilePage');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{props.title}</h3>
      {props.userData && <div>
        <p className={cn('data')}>{props.name}: <span className={cn('user-data')}>{props.userData.profile?.name}</span></p>
        <p className={cn('data')}>{props.phone}: <span className={cn('user-data')}>{props.userData.profile?.phone}</span></p>
        <p className={cn('data')}>email: <span className={cn('user-data')}>{props.userData.email}</span></p>
      </div>}
    </div>
  )
}

ProfilePage.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  userData: PropTypes.object,
}

export default memo(ProfilePage);