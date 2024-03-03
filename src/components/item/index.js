import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Button from "../button";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{props.item.price+" ₽"}</div>
      {props.isCart && <div className={cn("amount")}>{props.item.count+" шт"}</div> }
      <Button
        title={props.isCart ? "Удалить" : "Добавить"}
          onClick={callbacks.onClick}/>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  isCart: PropTypes.bool,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  isCart: false,
  onClick: () => {},
};

export default React.memo(Item);
