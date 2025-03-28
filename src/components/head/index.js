import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title="Магазин" }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string,
};

export default React.memo(Head);
