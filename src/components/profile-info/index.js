import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ProfileInfo({ profile, t }) {
  return (
    <div className="profile-info">
      <h2>{t('profile.title')}</h2>
      {profile && (
        <div className="profile-info__content">
          {profile.profile?.name && <p>Имя: {profile.profile.name}</p>}
          {profile.profile?.phone && <p>Телефон: {profile.profile.phone}</p>}
          <p>Email: {profile.email}</p>
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