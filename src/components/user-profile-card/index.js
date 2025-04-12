import React from 'react';
import './style.css';


const UserProfileCard = ({ userProps = [] }) => {
  return (
    <div className="UserProfCard">
      <h1>Профиль</h1>
      <div className="UserProfCard-prop-wrapper">
        {userProps.map((userProp, index) =>
          <div key={index} className={'UserProfCard-prop'}>
            <div className={'UserProfCard-prop-label'}>
              {userProp.title}:
            </div>
            <div className={'UserProfCard-prop-value'}>
              {userProp.value}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
