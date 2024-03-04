import React, { useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    /* onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    }, */
    onAdd: (e) => {
      //e.stopPropagation();
      props.action(props.item.code);
    },
  };

  return (
    <div className={cn()} /* onClick={callbacks.onClick} */>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{`${props.item.price} ₽`}</div>
      {props.item.count && (
        <div className={cn("price")}>{`${props.item.count} шт`}</div>
      )}
      <div className={cn("actions")}>
        <button onClick={callbacks.onAdd}>
          {props.item.count ? "Удалить" : "Добавить"}
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
  //onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  //onSelect: () => {},
};

export default React.memo(Item);
