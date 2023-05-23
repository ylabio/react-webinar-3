import React from "react";
import PropTypes from "prop-types";
import { numberWithSpaces } from "../../utils";
import "./style.css";

function Item(props) {
  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">
        <div className="Item-price__info">
          <span>{numberWithSpaces(props.item.price)}</span> <span>₽</span>
        </div>
        {props.item.count && (
          <div className="Item-count">
            <span> {props.item.count}</span> <span> шт</span>
          </div>
        )}
      </div>

      <div className="Item-actions">
        <button onClick={callbacks.onClick}>{props.buttonText}</button>
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

  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {},
};

export default React.memo(Item);
