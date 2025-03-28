import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onOpenBasket = () => {} }) {
  return (
    <div className="Controls">
      <button onClick={() => onOpenBasket()}>Пусто</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenBasket: PropTypes.func,
};

export default React.memo(Controls);
