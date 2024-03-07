import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Button from "../button";
import { formatPrice } from '../../utils';

function CartItem({item, onClick}) {
  const cn = bem('CartItem');

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      onClick(item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{formatPrice(item.price)}</div>
      <div className={cn("amount")}>{item.count+" шт"}</div>
      <Button title="Удалить" onClick={callbacks.onClick}/>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

CartItem.defaultProps = {
  onClick: () => {},
};

export default React.memo(CartItem);
