import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function ProfileCard({userInfo, t}) {
  const cn = bem('Profile');
  return (
    <div className={cn('wrapper')}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <div className={cn('block')}>{t('profile.name')}: <span className={cn('bold')}>{userInfo.profile.name}</span></div>
      <div className={cn('block')}>{t('profile.phone')}: <span className={cn('bold')}>{userInfo.profile.phone}</span></div>
      <div className={cn('block')}>email: <span className={cn('bold')}>{userInfo.email}</span></div>
    </div>
  );
}

ProfileCard.propTypes = {
  email: PropTypes.string,
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  }),
  t: PropTypes.func
}

export default ProfileCard;
