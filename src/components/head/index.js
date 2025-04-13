import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';


function Head({ title, children, TopBar }) {
  return (
    <div className="Head">
      {TopBar}
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
  TopBar: PropTypes.element,
};

export default memo(Head);
