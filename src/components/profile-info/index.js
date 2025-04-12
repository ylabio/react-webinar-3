import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ProfileInfo({ profile, t }) {
  return (
    <div className="profile-info">
      <h2>{t('profile.title')}</h2>
      {profile && (
        <div className="profile-info__content">
          {profile.profile?.name && (<div className="profile-info__row"><p className="profile-info__cell">Имя:</p> <p className="profile-info__cell">{profile.profile.name}</p></div>)}
          {profile.profile?.phone && (<div className="profile-info__row"><p className="profile-info__cell">Телефон:</p> <p className="profile-info__cell">{profile.profile.phone}</p></div>)}
          {profile?.email && (<div className="profile-info__row"><p className="profile-info__cell">Email:</p> <p className="profile-info__cell">{profile.email}</p></div>)}
        </div>
      )}
    </div>
  );
}

ProfileInfo.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string
    })
  }),
  t: PropTypes.func.isRequired
};

export default memo(ProfileInfo);