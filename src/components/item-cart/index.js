import React, {useState} from "react";
import PropTypes from "prop-types";
import {formatPrice, plural} from "../../utils";
import './style.css';

function ItemCart(props) {

  console.log("item" + props.item.code + props.item.count)

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDeleteItem(props.item.code);
    },
    onAdd: (e) => {
      props.onAddItem(props.item.code);
    }
  }

  return (
    <div className='ItemCart'>
      <div className='ItemCart-code'>{props.item.code}</div>
        <div className='ItemCart-title'>
            {props.item.title}
        </div>
        <div className="ItemCart-price">
            {formatPrice(props.item.price)}
        </div>
        <div className="ItemCart-count">
            {props.item.count}&nbsp;шт
        </div>
      <div className='ItemCart-actions'>
        <button onClick={callbacks.onDelete}>
            Удалить
        </button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

ItemCart.defaultProps = {
    onDeleteItem: () => {
  },
};

export default React.memo(ItemCart);

//{props.item.price}&nbsp;₽