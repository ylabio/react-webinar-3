import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileInfo({ user = { profile: { name: '', phone: '' }, email: '' } }) {
  const cn = bem('ProfileInfo');
  return (
    <div className={cn()}>
      <h2 className={cn('header')}>Профиль</h2>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>Имя:</div>
          <div className={cn('value')}>{user.profile.name}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Телефон:</div>
          <div className={cn('value')}>{user.profile.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Email:</div>
          <div className={cn('value')}>{user.email}</div>
        </div>
      </div>
    </div>
  );
}

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string,
  }).isRequired,
};

export default memo(ProfileInfo);
