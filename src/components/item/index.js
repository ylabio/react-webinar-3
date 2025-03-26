import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Controls from "../controls";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {formatPrice} from "../../utils";

function Item(props) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const cn = bem('Item');

  const callbacks = {};

  return (
    <div
      className={cn()}
      onClick={callbacks.onClick}
    >
      <div className={cn("title")}>
        <b>{props.item.title}</b>
      </div>
      <div className={cn("price")}>{formatPrice(props.item.price, 'ru', '₽') }</div>
      <div className={cn("actions")}>
        <Controls onButtonClick={props.onAddItemToCart} itemCode={props.item.code} isListButton={true} title="Добавить" />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
  onAddItemToCart: PropTypes.func,
};


export default React.memo(Item);
