import PropTypes from 'prop-types';
import './style.css';

function ProfileCard({userInfo, t}) {
  return (
    <div className='ProfileCard'>
      <h2 className='ProfileCard-title'>{t('profile.title')}</h2>
      <div className='ProfileCard-section'>{t('profile.name')}: <span className='ProfileCard-bold'>{userInfo.profile.name}</span></div>
      <div className='ProfileCard-section'>{t('profile.phone')}: <span className='ProfileCard-bold'>{userInfo.profile.phone}</span></div>
      <div className='ProfileCard-section'>email: <span className='ProfileCard-bold'>{userInfo.email}</span></div>
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
