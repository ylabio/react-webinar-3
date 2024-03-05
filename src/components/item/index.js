import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from '../../utils';
import './style.css';

function Item({item, onClick}) {

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
        {formatPrice(item.price)}
      </div>
      <div className='Item-actions'>
        <button className='Item-actions-button' onClick={handleClick}>
          Добавить
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
  onClick: PropTypes.func
};

Item.defaultProps = {
  onClick: () => {
  }
}

export default React.memo(Item);
