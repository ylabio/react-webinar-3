import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Spinner({ active, children }) {
  if (active) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default memo(Spinner);
