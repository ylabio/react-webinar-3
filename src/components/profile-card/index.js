import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {
  const { data, t = text => text } = props;
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.heading')}</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.name')}:</div>
        <div className={cn('value')}>{data?.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.phone')}:</div>
        <div className={cn('value')}>{data?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.email')}:</div>
        <div className={cn('value')}>{data?.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default memo(ProfileCard);
