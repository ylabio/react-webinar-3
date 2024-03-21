import { memo } from 'react';
import { cn as bem } from '@bem-react/classname'
import './style.css'
import PropTypes from 'prop-types';

function ProfileCard({ user, t }) {

  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <h2>{t('profile.title')}</h2>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.name')}:</div>
        <div className={cn('value')}>{user.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.phone')}:</div>
        <div className={cn('value')}>{user.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.email')}:</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.object,
    email: PropTypes.string
  }).isRequired,
  t: PropTypes.func
}

export default memo(ProfileCard)