import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ActionButton({ onClick = () => {}, text = 'Добавить', color = 'add' }) {
  const buttonClass = `Action-button Action-button-${color}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
}

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['add', 'del']),
};

export default ActionButton;
