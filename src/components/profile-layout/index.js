import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';

function ProfileLayout({userData, t}) {
  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Профиль</h3>
      <p className={cn('elem')}><span>{t('profile.name')}: </span><span className={cn('bold')}>{userData.name}</span></p>
      <p className={cn('elem')}><span>{t('profile.phone')}: </span><span className={cn('bold')}>{userData.phone}</span></p>
      <p className={cn('elem')}><span>email: </span><span className={cn('bold')}>{userData.email}</span></p>
    </div>
  )
}

ProfileLayout.propTypes = {
  userData: PropTypes.objectOf(PropTypes.string),
  t: PropTypes.func
}

ProfileLayout.defaultProps = {
  t: () => {}
}

export default memo(ProfileLayout)