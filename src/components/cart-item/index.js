import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function CartItem(props) {
  const callbacks = {
    function: () => {
      props.itemFunction(props.item.code);
    },
  };

  return (
    <div className={"Cart-Item"}>
      <div className="Left-part">
        <div className="Cart-Item-code">{props.item.code}</div>
        <div className="Cart-Item-title">{props.item.title}</div>
      </div>
      <div className="Rigth-part">
        <div className="Cart-Item-price">{Intl.NumberFormat().format(props.item.price)} ₽</div>
        {props.item.quantity && (
          <div className="Cart-Item-quantity">{props.item.quantity} шт.</div>
        )}
        <div className="Cart-Item-actions">
          <button onClick={callbacks.function}>{props.button}</button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

CartItem.defaultProps = {
  onAdd: () => {},
};

export default React.memo(CartItem);
