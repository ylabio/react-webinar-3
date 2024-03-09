import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({tag = 'h1', title, children}) {
  return (
    <div className='Head'>
      {tag === 'h1' ? <h1>{title}</h1> : <h2>{title}</h2>}
      <div className="Head-content">
        {children ? children : null}
      </div>
    </div>
  )
}

// Typechecking with PropTypes:
Head.propTypes = {
  tag: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node,
};

// Default values for properties:
Head.defaultProps = {
  tag: 'h1',
};

export default React.memo(Head);
