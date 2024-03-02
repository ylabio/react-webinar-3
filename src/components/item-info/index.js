import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ItemInfo({type, price, count}) {
  console.log('count', count)
  return (
    <div className='item-info'>
      <p>{`${price} ₽ `}{type === 'Cart' && `${count} шт.`}</p>
    </div>
  )
}

ItemInfo.propTypes = {
  info: PropTypes.node,
};

export default React.memo(ItemInfo);