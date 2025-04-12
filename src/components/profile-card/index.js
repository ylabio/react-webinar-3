import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ name, phone, email, t }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t('profile.title')}</h1>
      <div className={cn('info')}>
        <div className={cn('row')}>
          <span className={cn('label')}>{t('profile.name')}:</span>
          <span className={cn('value')}>{name || '-'}</span>
        </div>
        <div className={cn('row')}>
          <span className={cn('label')}>{t('profile.phone')}:</span>
          <span className={cn('value')}>{phone || '-'}</span>
        </div>
        <div className={cn('row')}>
          <span className={cn('label')}>{t('profile.email')}:</span>
          <span className={cn('value')}>{email || '-'}</span>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func.isRequired
};

export default memo(ProfileCard);
