import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function UserPanel({ children }) {
  return (
    <div className="UserPanel">
      <div className="UserPanel-container">{children}</div>
    </div>
  );
}

UserPanel.propTypes = {
  children: PropTypes.node.isRequired,
};
export default memo(UserPanel);
