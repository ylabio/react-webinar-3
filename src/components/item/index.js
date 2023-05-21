import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function Item(props) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    // onClick: () => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // },
    // onDelete: (e) => {
    //   e.stopPropagation();
    //   props.onDelete(props.item.code);
    // }
  };

  return (
    <div
      className={"Item" + (props.item.selected ? " Item_selected" : "")}
      onClick={callbacks.onClick}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}
        <div className="Item-price">
          {props.item.price.toLocaleString("ru-RU")} ₽
        </div>
        {props.item.count ? props.item.count + "шт" : null}
      </div>

      <div className="Item-actions">
        {/* <button onClick={() => props.onAddItem(props.item.code)}> */}
        <button onClick={() => console.log(props.item.code)}>
          {props.btnItem}
        </button>
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
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(Item);
