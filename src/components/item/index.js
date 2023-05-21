import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from "../button";
import './style.css';

function Item(props){
  const callbacks = {
    onHandleClick: () => {
      props.onHandleClick(props.item.code);
    }
  };

  return (
    <div className={"Item"} onClick={callbacks.onClick}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price.toLocaleString('ru-RU')} &#8381;</div>
      {props.item.count && (
        <div className="Item-count">{props.item.count} шт</div>
      )}
      <div className="Item-actions">
        <Button onClick={callbacks.onHandleClick}>{props.buttonName}</Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  buttonName: PropTypes.string.isRequired,
  count: PropTypes.number,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onHandleClick: PropTypes.func,
};

Item.defaultProps = {
  onHandleClick: () => {},
};

export default React.memo(Item);
