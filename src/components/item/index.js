import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { cn as bem } from "@bem-react/classname";
// import {plural} from "../../utils";
import "./style.css";

function Item(props) {
  // Счётчик выделений
  // const [count, setCount] = useState(0);
  const cn = bem("Item");

  const callbacks = {
    onButtonClick: (e) => {
      e.stopPropagation();
      props.buttonFunction(props.item);
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
        <Button title={props.buttonTitle} buttonFunction={callbacks.onButtonClick} />
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
  buttonFunction: PropTypes.func,
  buttonTitle: PropTypes.string,
};

Item.defaultProps = {
  buttonFunction: () => {},
  buttonTitle: 'Кнопка',
};

export default React.memo(Item);
