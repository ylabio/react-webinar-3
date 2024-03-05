import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from '../../utils';
import './style.css';

function CartItem({item, onClick}) {

  const handleClick = (event) => {
    event.stopPropagation();
    onClick(item.code);
  }

  return (
    <div className='CartItem'>
      <div className='CartItem-code'>{item.code}</div>
      <div className='CartItem-title'>
        {item.title}
      </div>
      <div className='CartItem-price'>
        {formatPrice(item.price)}
      </div>
      <div className='CartItem-amount'>
        {item.amount} шт
      </div>
      <div className='CartItem-actions'>
        <button className='CartItem-actions-button' onClick={handleClick}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func
};

CartItem.defaultProps = {
  onClick: () => {
  }
}

export default React.memo(CartItem);
