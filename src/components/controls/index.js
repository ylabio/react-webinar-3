import React from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import Button from "../button"
import './style.css';

function Controls({
  quantityItemsInCart,
  sumInCart,
  itemButtonText,
  handleButtonClick
}) {
  return (
    <div className='controls'>
      <div className='controls__info-block'>
        <span className='controls__info-block-text'>В корзине:</span>
        <span className="controls__cart-info">
          {quantityItemsInCart ? `${quantityItemsInCart} ${plural(quantityItemsInCart, { one: 'товар', few: 'товара', many: 'товаров' })} / ${sumInCart}` : 'пусто'}
        </span>
      </div>
      <Button buttonText={itemButtonText} onClick={handleButtonClick} />
    </div>
  )
}

Controls.propTypes = {
  quantityItemsInCart: PropTypes.number,
  sumInCart: PropTypes.string,
  itemButtonText: PropTypes.string,
  handleButtonClick: PropTypes.func,
};

Controls.defaultProps = {
  quantityItemsInCart: 0,
  sumInCart: 0,
  itemButtonText: '',
  handleButtonClick: () => { }
}

export default React.memo(Controls);
