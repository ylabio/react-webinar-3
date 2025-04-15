import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';

function ProfileLayout({t = text => text, user }) {

  const {
    username = '',
    email = '',
    profile: { phone = '' } = {}
  } = user || {};

 const cn = bem('ProfileLayout');

  return (
      <div className={cn()}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.name')}:</div>
          <div className={cn('value')}>
            {username || ''}
          </div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.phone')}:</div>
          <div className={cn('value')}>{phone || ''}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.mail')}:</div>
          <div className={cn('value')}>{email || ''}</div>
        </div>
      </div>
  );
}

ProfileLayout.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.shape({
      phone: PropTypes.string,
    })
  })
};


export default memo(ProfileLayout);
