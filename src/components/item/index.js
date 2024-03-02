import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <span className='Item-price'>{props.item.price}&nbsp;₽</span>
      {props.amount &&
      <span className='Item-amount'>{`${props.amount} шт`}</span>}
      <div className='Item-actions'>
        {props.onAdd &&
        <button onClick={() => props.onAdd(props.item.code)}>
          Добавить
        </button>}
        {props.onDelete &&
        <button onClick={() => props.onDelete(props.item.code)}>
          Удалить
        </button>}
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
  onDelete: PropTypes.func,
  amount: PropTypes.number,
};

export default React.memo(Item);
