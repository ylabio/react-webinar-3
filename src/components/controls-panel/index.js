import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ControlsPanel({children}) {
  return (
    <div className="ControlsPanel">
      {children}
    </div>
  );
}

ControlsPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ControlsPanel);
