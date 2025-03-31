import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function AddButton({ onClick }) {
  return (
    <button className="Add-button" onClick={onClick}>
      Добавить
    </button>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(AddButton);
