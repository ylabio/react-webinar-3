import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Spinner({ active = false, children }) {
  if (active) {
    return <div className="Spinner">{children}</div>;
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default memo(Spinner);
