import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ItemInfo({type, price, count}) {
  return (
    <div className='item-info'>
      <p>{`${price} ₽ `}{type === 'Cart' && `${count} шт.`}</p>
    </div>
  )
}

ItemInfo.propTypes = {
  type: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
};

export default React.memo(ItemInfo);