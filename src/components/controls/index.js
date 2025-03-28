import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


function Controls({ onAdd, buttonText }) {
  return (
    <div className="Controls">
      <button onClick={onAdd}>
        <span className="cart-icon"></span>
        {buttonText}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default React.memo(Controls);
