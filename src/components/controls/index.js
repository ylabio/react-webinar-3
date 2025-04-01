import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onClick = () => {}, label = 'Кнопка', variant = 'add' }) {
  return (
    <div className={`Controls Controls--${variant}`}>
      <button onClick={onClick}>{label}</button>
    </div>
  );
}

Controls.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['add', 'remove']),
};

export default React.memo(Controls);
