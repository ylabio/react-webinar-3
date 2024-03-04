import React, { useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
// import {plural} from "../../utils";
import "./style.css";

function Item(props) {
  // Счётчик выделений
  // const [count, setCount] = useState(0);
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{`${props.item.price} P`}</div>
      {props.item.count &&
        <div className={cn("count")}>{`${props.item.count} Шт`}</div>
      }
      <div className={cn("actions")}>
        <button onClick={callbacks.onAdd}>Добавить</button>
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
