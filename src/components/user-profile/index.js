import { memo } from 'react';
import './style.css';
import PropTypes from 'prop-types';

function UserProfile({ user }) {
  if (!user) {
    return <p>Данные профиля недоступны</p>;
  }

  const { profile, email } = user;

  return (
    <div className="UserProfile">
      <h2 className="UserProfile-title">Профиль</h2>
      <div className="UserProfile-info">
        <div className="UserProfile-prop">
          <div className="UserProfile-label">Имя:</div>
          <div className="UserProfile-value">{profile.name || 'Неизвестно'}</div>
        </div>
        <div className="UserProfile-prop">
          <div className="UserProfile-label">Телефон:</div>
          <div className="UserProfile-value">{profile.phone || 'Неизвестно'}</div>
        </div>
        <div className="UserProfile-prop">
          <div className="UserProfile-label">Email:</div>
          <div className="UserProfile-value">{email || 'Неизвестно'}</div>
        </div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string,
  }),
};

export default memo(UserProfile);
