import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import iconCart from '../../assets/img/iconCart.svg';

function Controls({ text = 'Пусто', showModal = () => {} }) {
  return (
    <div className="Controls">
      <button onClick={showModal}>
        <img src={iconCart} alt="" />
        {text}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default React.memo(Controls);
