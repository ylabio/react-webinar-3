import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Controls from '../controls';
import { numberFormat } from "../../utils";

function Item(props) {
  const callbacks = {
    onAdd: (code) => {
      props.onAddItem(code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Item-code">{numberFormat(props.item.price)} ₽</div>
      <Controls onAdd={() => callbacks.onAdd(props.item.code)} />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    cartQuantity: PropTypes.number,
  }).isRequired,
  onAddItem: PropTypes.func,
};

export default React.memo(Item);
