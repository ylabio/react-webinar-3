import React from 'react';
import SideLayout from "../side-layout";
import './style.css'
import PropTypes from "prop-types";

const ProfileInfo = ({ user, t }) => {
  return (
    <SideLayout side='start' padding='medium'>
      <div className='ProfileInfo'>
        <span className='ProfileInfo-title'>{t('user.profile')}</span>
        <div className='ProfileInfo-body'>
          <span>{t('user.name')}: <b>{user.name}</b></span>
          <span>{t('user.phone')}: <b>{user.phone}</b></span>
          <span>email: <b>{user.email}</b></span>
        </div>
      </div>
    </SideLayout>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object,
  t: PropTypes.func
}

export default React.memo(ProfileInfo);
