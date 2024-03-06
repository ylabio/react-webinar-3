import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { cn as bem } from "@bem-react/classname";
import { currency } from "../../utils";

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    addToCart: () => {
      props.addToCart(props.item.code);
    },
    deleteFromCart: () => {
      props.deleteFromCart(props.item.code)
    }
  }

const onClickFn = props.actionBtn === 'Добавить' ? callbacks.addToCart : callbacks.deleteFromCart

const priceMargin = props.priceStyle ? props.priceStyle : {}

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')} style={priceMargin}>
        {currency(props.item.price)}
      </div>
      {props.showAmount && 
      <div className={cn('amount')}>
        <span>{props.count} шт</span>
      </div>
      }
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={onClickFn}>
          {props.actionBtn}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  actionBtn: PropTypes.string,
  showAmount: PropTypes.bool,
  onAddToCart: PropTypes.func,
  deleteFromCart: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => {
  },
  deleteFromCart: () => {
  },
}

export default Item;
