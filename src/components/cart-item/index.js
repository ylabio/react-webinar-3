import PropTypes from "prop-types";
import React from "react";
import "./style.css";
import {setPriceFormat} from "../../utils";

function CartItem(props) {
  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      props.onAction(props.item.code);
    },
  };

  return (
    <div className={"CartItem"}>
      <div className="CartItem-code">{props.item.code}</div>
      <div className="CartItem-title">{props.item.title}</div>
      <div className="CartItem-price">{setPriceFormat(props.item.price)}</div>
      <div className="CartItem-count">{props.item.count} шт</div>
      <div className="CartItem-actions">
        <button onClick={callbacks.onAction}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
		count: PropTypes.number
  }).isRequired,
  onAction: PropTypes.func,
};

CartItem.defaultProps = {
  onAction: () => {},
};

export default React.memo(CartItem);