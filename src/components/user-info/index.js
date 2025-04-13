import { memo } from 'react';


import './style.css';

function UserInfo({ userData = { name: '', phone: '', email: '' }, t = (t) => t }) {
  return (
    <div className="UserInfo">
      <h2>{t('profile')}</h2>
      <div className="UserInfo-container">
        <div className="UserInfo-text">
          <span className="UserInfo-category">{t('profile.name')}:</span>
          <span className="UserInfo-description">{userData.name}</span>
        </div>
        <div className="UserInfo-text">
          <span className="UserInfo-category">{t('profile.phone')}:</span>
          <span className="UserInfo-description">{userData.phone}</span>
        </div>
        <div className="UserInfo-text">
          <span className="UserInfo-category">Email:</span>
          <span className="UserInfo-description">{userData.email}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(UserInfo);
