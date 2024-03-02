import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title,orange}) {
  return (
    <div className={(orange ? 'Head' : 'Head')}>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  orange: PropTypes.bool
};

export default React.memo(Head);
