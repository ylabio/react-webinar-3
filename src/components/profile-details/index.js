import React from 'react';
import { memo } from 'react';

const ProfileDetails = ({user}) => {
  return (
    <div className="ProfileDetails">
      <h1 className="ProfileDetails-title">Профиль</h1>
      <div className="ProfileDetails-details">
        <p>
          Имя: <span className="ProfileDetails-info">{user.profile?.name}</span>
        </p>
        <p>
          Телефон: <span className="ProfileDetails-info">{user.profile?.phone}</span>
        </p>
        <p>
          Email: <span className="ProfileDetails-info">{user.email}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(ProfileDetails)
;
