import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalHead({ title }) {
  return (
    <div className="Modal__head">
      <div className="Modal__head-container">
        <h2>{title}</h2>
      </div>
    </div>
  );
}

ModalHead.propTypes = {
  title: PropTypes.node,
};

export default React.memo(ModalHead);
