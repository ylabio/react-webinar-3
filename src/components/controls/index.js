import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartIcon from './cart.svg';

function Controls({ text = "Пусто", showModal = () => {}}) {

  const callbacks = {
    onClick: () => {
      showModal();
    },
  };
  
  return (
    <div className="Controls">
      <button onClick={callbacks.onClick}><img src={CartIcon}/>{text}</button>
    </div>
  );
}

Controls.propTypes = {
  text: PropTypes.string.isRequired,
  showModal: PropTypes.func,
};

export default React.memo(Controls);
