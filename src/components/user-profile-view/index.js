import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const UserProfileView = ({ user, t }) => {
  const cn = bem('UserProfile');

  return (    
    <>
      {user && 
        <div className={cn()}>
          <h2 className={cn('title')}>{t('profile.title')}</h2>
          <div className={cn('wrapper')}>
            <p>{t('profile.name')} {' '}
              <span>{user?.profile.name}</span>
            </p>
            <p>{t('profile.phone')} {' '}
              <span>{user?.profile.phone}</span>
            </p>
            <p>email: {' '}
              <span>{user?.email}</span>
            </p>
          </div>
        </div>
      }
    </>
  );
};

UserProfileView.propTypes = {
  user: PropTypes.object,
  t: PropTypes.func
};

export default memo(UserProfileView);