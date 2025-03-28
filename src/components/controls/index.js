import React from 'react';
import './style.css';

function Controls({ onAdd, buttonText = 'Пусто'}) {
  return (
    <div className="Controls">
      <button onClick={onAdd}>
        <span className="cart-icon"></span>
        {buttonText}
      </button>
    </div>
  );
}

export default React.memo(Controls);
