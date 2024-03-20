import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileInfo({ user, t }) {
  const cn = bem('ProfileInfo');

  return (
    <>
      {user && (
        <div className={cn()}>
          <h2 className={cn('title')}>{t('profile.title')}</h2>
          <div className={cn('wrapper')}>
            <p>{t('profile.name')} <b>{user?.profile?.name}</b></p>
            <p>{t('profile.phone')} <b>{user?.profile?.phone}</b></p>
            <p>email: <b>{user?.email}</b></p>
          </div>
        </div>
      )}
    </>
  )
}

ProfileInfo.propTypes = {
  user: PropTypes.object,
  t: PropTypes.func
};

export default memo( ProfileInfo );