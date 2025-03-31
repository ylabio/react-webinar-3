import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalHead({ title }) {
  return (
    <div className="ModalHead">
      <div className="ModalHead-container">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

ModalHead.propTypes = {
  title: PropTypes.node,
};

export default React.memo(ModalHead);
