import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, children, authField }) {
  return (
    <div className="Head">
      <div className="Head-top">{authField}</div>
      <div className="Head-container">
        <h1>{title}</h1>
        <div className="Head-place">{children}</div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  authField: PropTypes.node,
};

export default memo(Head);
