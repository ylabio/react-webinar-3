import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileInfo({profile, t, error}) {
  const cn = bem('ProfileInfo');
  return (
    <div className={cn()}>
      {error ? (
        <div className={cn('error')}>{error}</div>
      ) : (
        <>
          <h2 className={cn('title')}>{t('profile.title')}</h2>
          <div className={cn('prop')}>
            <div className={cn('label')}>{t('profile.name')}:</div>
            <div className={cn('value')}>{profile.username}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>{t('profile.phone')}:</div>
            <div className={cn('value')}>{profile.profile?.phone}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>email:</div>
            <div className={cn('value')}>{profile.email}</div>
          </div>
        </>
      )}
      </div>
  );
}

ProfileInfo.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
    profile: PropTypes.object,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
};

ProfileInfo.defaultProps = {
  onAdd: () => {
  },
  t: (text) => text
}

export default memo(ProfileInfo);
