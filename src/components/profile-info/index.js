import { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import "./style.css";

const ProfileInfo = ({user, labelProfile, labelName, labelPhone, labelEmail}) => {

  return (
    <div className="Profile">
      <h3 className="Profile-heading">{labelProfile}:</h3>
      <p className="Profile-entry">{labelName}:<span className="Profile-entry-bold">{user?.profile.name}</span></p>
      <p className="Profile-entry">{labelPhone}: <span className="Profile-entry-bold">{user?.profile.phone}</span></p>
      <p className="Profile-entry">{labelEmail}: <span className="Profile-entry-bold">{user?.email}</span></p>
    </div>
  );
}

ProfileInfo.propTypes = {
    user: PropTypes.object,
    labelProfile: PropTypes.string,
    labelName: PropTypes.string,
    labelPhone: PropTypes.string,
    labelEmail: PropTypes.string,
};

export default memo(ProfileInfo);