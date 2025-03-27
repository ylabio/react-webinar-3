import React from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import './style.css';

function Item(props) {

  const callbacks = {

    onClick: e => {
      e.stopPropagation();
      props.onAdd(props.item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Item-price">
        <NumericFormat value={props.item.price}
        displayType={'text'}
        thousandSeparator=" "
        suffix={' ₽'} />
        </div>
      <div className="Item-actions">
        <button onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};


export default React.memo(Item);
