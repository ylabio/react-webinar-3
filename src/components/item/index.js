import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    handleCart: (e) => {
      e.stopPropagation();
      props.handleCart(props.item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-info">
        <span className="Item-info__price">{`${props.item.price} ₽`}</span>
        {props.count > 0 ? (
          <div className="Item-info__count">{`${props.count} шт`}</div>
        ) : null}
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.handleCart}>{props.title}</button>
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
  addItemToCart: PropTypes.func,
  handleCart: PropTypes.func,
};

Item.defaultProps = {
  addItemToCart: () => {},
  handleCart: () => {},
};

export default React.memo(Item);
