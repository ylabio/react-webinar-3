import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {
  const { user, t = text => text } = props;
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.name')}:</div>
          <div className={cn('value')}>
            {user.profile?.name}
          </div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.phone')}:</div>
          <div className={cn('value')}>{user.profile?.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Email:</div>
          <div className={cn('value')}>{user?.email}</div>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.object,
  }).isRequired,
  t: PropTypes.func,
};

export default memo(ProfileCard);
