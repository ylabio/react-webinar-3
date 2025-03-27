import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, cartTotal, cartSum, onOpenCart  }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <div className="Head-cart">
          <span>Товаров: {cartTotal} на сумму: {cartSum} руб.</span>
          <button onClick={onOpenCart}>Корзина</button>
        </div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  cartTotal: PropTypes.number,
  cartSum: PropTypes.number,
  onOpenCart: PropTypes.func
};

Head.defaultProps = {
  cartTotal: 0,
  cartSum: 0,
  onOpenCart: () => {}
};

export default React.memo(Head);
