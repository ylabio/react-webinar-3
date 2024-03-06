import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { formatPrice } from "../../utils";

function Item(props) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item);
    },
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-group'>
        <div className='Item-title'>{props.item.title}</div>
        <div className='Item-price'>{formatPrice(props.item.price)} &#8381;</div>
      </div>
      <div className='Item-actions'>
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
    count: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {
  }
}

export default React.memo(Item);
