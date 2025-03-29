import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const callbacks = {
    onAddToCart: e => {
      props.onAddToCart(props.item.code);
    },
    onDeleteFromCart: e => {
      props.onDeleteFromCart(props.item.code);
    },
  };

  const Info = props.isSumItem ? (
    <>
      <div className='sum'>
        <span className='text'>Итого:</span>
        <span className='value'>{`${props.cartSum} ₽`}</span>
      </div>
    </>
  ) : (
    <>
      <b>{props.item.title}</b>
      <div className={`Item-info ${props.isCart ? 'isCart' : ''}`}>
        {props.isCart ? <span>{`${props.item.cartCount} шт.`}</span> : null}
        <span className='value'>{`${props.item.price} ₽`}</span>
      </div>
    </>)

  return (
    <div
      className="Item"
      onClick={callbacks.onClick}
    >
      <div className={`Item-code ${props.isSumItem ? 'Item-sum' : ''}`}>{props?.item?.code || 0}</div>
      <div className={`Item-title ${props.isSumItem ? 'Item-sum' : ''}`}>
        {Info}
      </div>
      <div className={`Item-actions ${props.isSumItem ? 'Item-sum' : ''}`}>
        {props.isCart ?
          <button className='removeBtn' onClick={callbacks.onDeleteFromCart}>Удалить</button> :
          <button className='addBtn' onClick={callbacks.onAddToCart}>Добавить</button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    cartCount: PropTypes.number,
  }),
  isCart: PropTypes.bool,
  isSumItem: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
  cartSum: PropTypes.number,
};

export default React.memo(Item);
