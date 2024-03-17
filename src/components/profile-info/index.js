import React from 'react';
import SideLayout from "../side-layout";
import './style.css'
import PropTypes from "prop-types";

const ProfileInfo = ({ user }) => {
  return (
    <SideLayout side='start' padding='medium'>
      <div className='ProfileInfo'>
        <span className='ProfileInfo-title'>Профиль</span>
        <div className='ProfileInfo-body'>
          <span>Имя: <b>{user.name}</b></span>
          <span>Телефон: <b>{user.phone}</b></span>
          <span>email: <b>{user.email}</b></span>
        </div>
      </div>
    </SideLayout>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object
}

export default React.memo(ProfileInfo);
