import PropTypes from "prop-types";
import React from "react";
import "./style.css";
import {setPriceFormat} from '../../utils'

function Item(props) {
  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      props.onAction(props.item.code);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{setPriceFormat(props.item.price)}</div>
      <div className="Item-actions">
        <button onClick={callbacks.onAction}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    selected: PropTypes.bool,
  }).isRequired,
  onAction: PropTypes.func,
};

Item.defaultProps = {
  onAction: () => {},
};

export default React.memo(Item);