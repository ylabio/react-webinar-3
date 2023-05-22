import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      const item = {
        code: props.item.code,
        price: props.item.price,
        title: props.item.title,
        count: 1,
      };
      props.onAdd(item);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-wrap">
        <div className="Item-title">{props.item.title}</div>
        <div className="Item-price">
          <span>{props.item.price.toLocaleString()} &#8381;</span>
        </div>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
