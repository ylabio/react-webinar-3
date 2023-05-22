import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function ItemBasket(props) {
  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className="ItemBasket">
      <div className="ItemBasket-code">{props.item.code}</div>
      <div className="ItemBasket-wrap">
        <div className="ItemBasket-title">{props.item.title}</div>
        <div className="ItemBasket-price">
          <span>{props.item.price.toLocaleString()} &#8381;</span>
        </div>
        <div className="ItemBasket-count">
          <span>{props.item.count} шт</span>
        </div>
      </div>
      <div className="ItemBasket-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

ItemBasket.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(ItemBasket);
