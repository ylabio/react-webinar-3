import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function ProfileInfo({user}) {

  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <span className={cn('Title')}>Профиль</span>
      <span>Имя: <b>{user.name}</b></span>
      <span>Телефон: <b>{user.phone}</b></span>
      <span>email: <b>{user.email}</b></span>
    </div>
  );
}

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired
}

export default ProfileInfo;
