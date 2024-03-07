import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Button from "../button";
import { formatPrice } from '../../utils';

function Item({item, onClick}) {
  const cn = bem('Item');

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      onClick(item);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{formatPrice(item.price)}</div>
      <Button title="Добавить" onClick={callbacks.onClick}/>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {},
};

export default React.memo(Item);
