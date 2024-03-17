import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserData({user, t}) {
  const cn = bem('UserData');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.user.name')}</div>
        <div className={cn('value')}>{user.profile.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.user.phone')}</div>
        <div className={cn('value')}>{user.profile.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.user.email')}</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
}

UserData.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    })
  }),
  t: PropTypes.func
};

UserData.defaultProps = {
  user: {},
  t: (text) => text
}

export default memo(UserData);