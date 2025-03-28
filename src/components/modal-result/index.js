import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalResult({ allPrise }) {
  return (
    <div className="Modal__result">
      <div className="Modal__result-container">
        <h2>Итого:</h2>
        <h2>{allPrise} &#8381;</h2>
      </div>
    </div>
  );
}

ModalResult.propTypes = {
  title: PropTypes.node,
};

export default React.memo(ModalResult);
