import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Controls from '../controls';
import ActionButton from '../action-button';

function Head({ title }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
