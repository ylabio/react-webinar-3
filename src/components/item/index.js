import React from "react";
import PropTypes from "prop-types";
import {formatNumber} from '../../utils'
import './style.css';

function Item({item, onActionType, onActionTitle}) {  

  const {price, code, title, quantity } = item;
  
  const formattedPriceNumber = formatNumber(price);

  return (
    <div className='Item'>
      <div className='Item-code'>{code}</div>
      <div className='Item-title'>{title}</div>
      <div className='Item-actions'>
        <div className='Item-wrapper'>
          <div className='Item-price'>{formattedPriceNumber} ₽</div>
          {quantity && <span className='Item-quantity'>{quantity} шт</span>}
        </div>
        <button onClick={() => onActionType(item)}>{onActionTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onActionType: PropTypes.func,
  onActionTitle: PropTypes.string
};

export default React.memo(Item);
