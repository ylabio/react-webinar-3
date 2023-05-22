import React from "react";
import PropTypes from "prop-types";
import {formatMoney} from "../../utils";
import './style.css';

function Item(props) {
  const callbacks = {
   onAddToCart: (e) => {
      e.stopPropagation();
      props.onAction(props.item.code);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{formatMoney(props.item.price)}</div>
      {props.item.count && (
        <div className="Item-count">{props.item.count} шт</div>
      )}
      <div className="Item-actions">
        <button onClick={callbacks.onAddToCart}>{props.actionTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);