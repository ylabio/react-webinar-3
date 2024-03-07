import React from "react";
import PropTypes from 'prop-types';
import {numberWithSpaces} from "../../utils";
import './style.css';

function Item({item, onAdd}) {
  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title} 
      </div>
      <div className='Item-price'>
        {numberWithSpaces(item.price)} ₽
      </div>
      <div className='Item-actions'>
        <button className='Item-actions__button' onClick={() => onAdd(item.code)}>
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
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {
  }
}

export default React.memo(Item);