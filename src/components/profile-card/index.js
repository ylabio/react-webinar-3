import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ProfileCard({profile, t}) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile')}</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.name')}:</div>
        <div className={cn('value')}>{profile.profile.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.phone')}:</div>
        <div className={cn('value')}>{profile.profile.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.email')}:</div>
        <div className={cn('value')}>{profile.email}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      phone: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired
}

export default memo(ProfileCard);