import React from "react";
import PropTypes from "prop-types";
import {formatPrice} from "../../utils";
import Button from '../ui/button';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProductItem(props) {

  const cn = bem('ProductItem');

  const callbacks = {
    onAddItemToCart: () => {
      props.onAddItemToCart(props.item.code)
    },
  }

  return (
    <div className={cn()} >
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatPrice(props.item.price)}</div>
      <div className={cn('actions')}>
      <Button onClick={callbacks.onAddItemToCart}>Добавить</Button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddItemToCart: PropTypes.func.isRequired,
};

ProductItem.defaultProps = {
  onAddItemToCart: () => {}
}

export default React.memo(ProductItem);
