import { cn } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

const ProfileCard = props => {
  const profileCard = cn('ProfileCard');

  return (
    <div className={profileCard()}>
      <h2>{props.t('title.profile')}</h2>
      <div className={profileCard('item')}>
        {props.t('user.name')}: <span>{props.name}</span>
      </div>
      <div className={profileCard('item')}>
        {props.t('user.phone')}: <span>{props.phone}</span>
      </div>
      <div className={profileCard('item')}>
        Email: <span>{props.email}</span>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  t: PropTypes.func,
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};

export default ProfileCard;
