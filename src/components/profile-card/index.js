import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({user, isExist, t}) {
  const cn = bem('ProfileCard');
 
  return (
    isExist && (
      <div className={cn()}>
        <h1 className={cn('title')}>{t('profile.title')}</h1>
        <div className={cn('line')}>
          <span className={cn('label')}>{t('profile.name')}: </span>
          <b className={cn('value')}>{user?.profile.name}</b>
        </div>
        <div className={cn('line')}>
          <span className={cn('label')}>{t('profile.phone')}: </span>
          <b className={cn('value')}>{user?.profile.phone}</b>
        </div>
        <div className={cn('line')}>
          <span className={cn('label')}>{t('profile.email')}: </span>
          <b className={cn('value')}>{user?.email}</b>
        </div>
      </div>
    )
  );
}

ProfileCard.propTypes = {
  user: PropTypes.object,
  t: PropTypes.func,
};

export default memo(ProfileCard);
