import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({user, t}) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{user.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{user.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      phone: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func
};

export default memo(ProfileCard);
