import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">
        <p>{new Intl.NumberFormat("ru").format(props.item.price)}</p>
        <p>&#8381;</p>
        <p>{props.del ? `${props.item.count}шт` : ""}</p>
      </div>
      <div className="Item-actions">
        <button
          onClick={() =>
            props.del
              ? props.removeItem(props.item.code)
              : props.onAddItem(props.item.code)
          }
        >
          {props.del ? props.del : "Добавить"}
        </button>
      </div>
      {props.del ? props.itogo() : ""}
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    del: PropTypes.string,
  }).isRequired,
  removeItem: PropTypes.func,
  itogo: PropTypes.func,
};

Item.defaultProps = {
  removeItem: () => {},
  itogo: () => {},
};

export default React.memo(Item);
