import React, { useState } from "react";
import PropTypes from "prop-types";
import { getFormatNumber } from "../../utils";
import "./style.css";

function Item({ showCount = false, ...props }) {
  // Счётчик выделений

  return (
    <div className={"Item" + (props.item.selected ? " Item_selected" : "")}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        <div className="Item-price">
          {getFormatNumber(props.item.price) + " ₽"}
        </div>
        {showCount ? (
          <div className="Item-count">{props.item.count} шт</div>
        ) : null}
        <button onClick={() => props.onSmthDo(props.item.code)}>
          {props.btnTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onSmthDo: PropTypes.func,
};

Item.defaultProps = {
  onSmthDo: () => {},
};

export default React.memo(Item);
