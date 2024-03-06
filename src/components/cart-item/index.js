import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatPrice } from "../../utils";

function CartItem(props) {
  const cn = bem('CartItem');

  const handleDeleteItemClick = () => {
    props.onAction(props.item);
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        <span>{formatPrice(props.item.price)} ₽</span>
      </div>
      <div className={cn('count')}>{props.item.count} шт</div>
      <div className={cn('actions')}>
        <Button text='Удалить' onAction={handleDeleteItemClick}/>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  actionText: PropTypes.string,
  onDelete: PropTypes.func,
};

CartItem.defaultProps = {
  onDelete: () => {},
};

export default React.memo(CartItem);
