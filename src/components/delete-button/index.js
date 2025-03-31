import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function DeleteButton({ onClick }) {
  return (
    <button className="Delete-button" onClick={onClick}>
      Удалить
    </button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(DeleteButton);
