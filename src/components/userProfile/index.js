import {memo} from 'react';
import PropType from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserProfile({userData, t}) {
  const cn = bem('UserProfile');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{`${t('profile.name')}:`}</div>
        <div className={cn('value')}>{userData.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{`${t('profile.phone')}:`}</div>
        <div className={cn('value')}>{userData.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{`${t('profile.email')}:`}</div>
        <div className={cn('value')}>{userData.email}</div>
      </div>
    </div>
  )
};

UserProfile.propTypes = {
  userData: PropType.object.isRequired,
  t: PropType.func,
};

UserProfile.defaultProps = {
  t: (text) => text
}

export default memo(UserProfile);