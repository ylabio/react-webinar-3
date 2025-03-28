import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAdd }) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>
        <img src='/icons/cart.svg' alt="Корзина" width={24} height={24} />
        <span>Пусто</span>
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
