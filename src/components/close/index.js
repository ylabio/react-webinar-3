import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Close({ onClose = () => { } }) {
  return (
    <div className="Close">
      <button onClick={() => onClose()}></button>
    </div>
  );
}

Close.propTypes = {
  onClose: PropTypes.func
};

// Close.defaultProps = {
//   onClose: () => { },
// };

export default React.memo(Close);
