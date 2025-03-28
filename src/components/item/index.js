import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props = {
  onClick: () => { },
  buttonText: 'Добавить',
  buttonStyle: 'primary',
  isCart: false,
  isTotalLine: false,
}) {
  const callbacks = {
    onClick: e => {
      props.onClick(props.item.code);
    },
  };

  if (props.isCart && props.item.count === 0) return null;

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{props.item.title}</b>
        <div className="Item-details">
          {(props.isCart) ? <span>{props.item.count} шт</span> : (!props.isTotalLine ? <span></span> : <b>Итого:</b>)}
          <span className={"Item-price" + (props.isTotalLine ? " Item-bold" : '')}>{props.item.price} &#8381;</span>
        </div>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onClick} className={props.buttonStyle}>{props.buttonText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  buttonStyle: PropTypes.string,
  isCart: PropTypes.bool,
  isTotalLine: PropTypes.bool,
};

export default React.memo(Item);
