import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function ProfileCard({ user, t = text => text }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h1>{t('profile.title')}</h1>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.name')}</div>
          <div className={cn('value')}>{user?.profile.name}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.phone')}</div>
          <div className={cn('value')}>{user?.profile?.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.email')}</div>
          <div className={cn('value')}>{user?.email}</div>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
  }),
  t: PropTypes.func,
};

export default memo(ProfileCard);
