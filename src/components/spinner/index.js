import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function Spinner({ active, children }) {
  if (active) {
    return <div className="Spinner">{children}</div>;
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default memo(Spinner);
