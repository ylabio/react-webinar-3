import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Vidget({cart}) {
  return (
    <div className='Vidget'>
      <div className='Vidget-title'>В корзине:
        <strong className='Vidget-inform'>
          {cart ? `${cart.goods} товара / ${cart.costs} ₽` : 'пусто'}
        </strong>
      </div>
    </div>
  )
}

// Typechecking with PropTypes:
Vidget.propTypes = {
  cart: PropTypes.shape({
    goods: PropTypes.number,
    costs: PropTypes.number
  }),
};

export default React.memo(Vidget);
