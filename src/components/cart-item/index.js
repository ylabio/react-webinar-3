import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {formattedNumber} from "../../utils";
import {cn as bem} from "@bem-react/classname";

function CartItem({onClickAction = () => {}, item}) {

  const cn = bem("CartItem");

  const callbacks = {
    onClick: () => {
      onClickAction(item.code);
    }
  };

  return (
    <div className={cn()}>
      <b className={cn("title")}>{item.title}</b>
      <span className={cn("count")}>{item.count} шт</span>
      <span className={cn("price")}>{formattedNumber(item.total)} ₽</span>
      <div className={cn("actions")}>
        <button onClick={callbacks.onClick}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  onClickAction: PropTypes.func,
};

export default React.memo(CartItem);
