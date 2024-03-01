import React from "react";
import PropTypes from "prop-types";
import { formatSum } from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    addBasket: () => props.onAdd(props.item.code),
  }

  return (
    <div className={'Item' }
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <div className='Item-price'>{formatSum(props.item.price)} ₽</div>
        <button className='Item-button' onClick={callbacks.addBasket}>
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
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);
