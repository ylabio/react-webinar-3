import React from "react";
import PropTypes from "prop-types";
import { getPrice } from '../../utils';
import './style.css';

function Item({item, buttonText, onClick}) {

  const handleClick = (event) => {
    event.stopPropagation();
    onClick(item.code);
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className='Item-price'>
        {getPrice(item.price)}
      </div>
      {item.amount && <div className='Item-amount'>
        {item.amount} шт
      </div>}
      <div className='Item-actions'>
        <button className='Item-actions-button' onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};

Item.defaultProps = {
  buttonText: 'Нажать',
  onClick: () => {
  }
}

export default React.memo(Item);
