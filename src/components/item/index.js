import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice } from '../../utils';

function Item(props) {

  const [addCount, setAddCount] = useState(0);

  const callbacks = {
    onCartButtonClick: e => {
      e.stopPropagation();
      props.onCartButtonClick(props.item.code, 1);
      setAddCount(addCount + 1);
    }
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>

      <div className="Item-price">
        {formatPrice(props.item.price)}
      </div>

      {props.isCart &&
        <div className='Item-count'>
          {props.item.quantity} шт
        </div>}

      <div className='Item-actions'>
        <button
          onClick={callbacks.onCartButtonClick}
          className={props.isCart ? 'Item-delete-button' : 'Item-add-button'}
        >
          {props.isCart ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onCartButtonClick: PropTypes.func.isRequired,
};

export default React.memo(Item);
