import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ profile = '', t = '', title = '' }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      {title && <h2 className={cn('title')}>{title}</h2>}
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.name')}:</div>
          <div className={cn('value')} data-field="name">
            {profile.name}
          </div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.phone')}:</div>
          <div className={cn('value')} data-field="phone">
            {profile.phone}
          </div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.email')}:</div>
          <div className={cn('value')} data-field="email">
            {profile.email || 'Не указано'}
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default memo(ProfileCard);