import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {
  const { user, t = text => text } = props;
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h1 className={cn('title')}>Профиль</h1>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>Имя:</div>
          <div className={cn('value')}>
            {user.username}
          </div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Телефон:</div>
          <div className={cn('value')}>{user.profile?.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Email:</div>
          <div className={cn('value')}>{user.email}</div>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.object,
  }).isRequired,
  t: PropTypes.func,
};

export default memo(ProfileCard);
