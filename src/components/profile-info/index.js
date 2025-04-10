import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ProfileInfo({ profile, email }) {
  return (
    <div className="profile-page">
      <h1>Профиль</h1>
      <div className="profile-info">
        <div className="info">
          <>Имя:</> <span>{profile?.name || '—'}</span>
        </div>
        <div className="info">
          <>Телефон:</> <span>{profile?.phone || '—'}</span>
        </div>
        <div className="info">
          <>Email:</> <span>{email || '—'}</span>
        </div>
      </div>
    </div>
  );
}

ProfileInfo.propTypes = {
  profile: PropTypes.object,
  username: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.number,
};

export default memo(ProfileInfo);
