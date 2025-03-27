import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAdd }) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>3 товара / 223 ₽</button>
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
