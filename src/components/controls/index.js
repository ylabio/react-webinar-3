import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onOpenCart, children }) {

  const callbacks = {
    onOpenCart: () => {
      onOpenCart()
    }
  }

  return (
    <div className='Controls'>
      {children}
      <button onClick={callbacks.onOpenCart}>
        Перейти
      </button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  children: PropTypes.node
};

Controls.defaultProps = {
  onOpenCart: () => {},
}

export default React.memo(Controls);
