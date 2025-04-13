import React from 'react';
import { memo } from 'react';
import 'style.css';

const ProfileDetails = ({ user }) => {
  return (
    <div className="ProfileDetails">
      <h1 className="ProfileDetails-title">Профиль</h1>
      <div className="ProfileDetails-details">
        <span id="name-title">Имя:</span>
        <span id="name-value" className="ProfileDetails-info">
          {user.profile?.name}
        </span>
        <span id="phone-title">Телефон:</span>
        <span id="phone-value" className="ProfileDetails-info">
          {user.profile?.phone}
        </span>
        <span id="email-title">Email:</span>
        <span id="email-value" className="ProfileDetails-info">
          {user.email}
        </span>
      </div>
    </div>
  );
};

export default memo(ProfileDetails);
