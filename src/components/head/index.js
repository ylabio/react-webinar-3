import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1 className="Head-title">{title}</h1>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
};

export default React.memo(Head);
