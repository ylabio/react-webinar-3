import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ButtonUser({ profileName, handleProfileClick }) {
  return (
    <span className="ButtonUser" onClick={handleProfileClick}>
      {profileName}
    </span>
  );
}
ButtonUser.propTypes = {
  profileName: PropTypes.string,
  handleProfileClick: PropTypes.func,
};

export default memo(ButtonUser);
