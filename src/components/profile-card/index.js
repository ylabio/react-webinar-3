import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ data, t = text => text }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('user.profile')}</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('user.name')}:</div>
        <div className={cn('value')}>{data?.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('user.phone')}:</div>
        <div className={cn('value')}>{data?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Email:</div>
        <div className={cn('value')}>{data?.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(ProfileCard);
