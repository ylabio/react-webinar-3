import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Item(props) {

  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}> 
        {props.item.price.toLocaleString("ru-RU", {currency: "RUB", style: "currency", minimumFractionDigits: 0})}
        </div>
      <div className={cn('actions')}>
        <button onClick={() => props.onAddToCart(props.item)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => {}
}

export default React.memo(Item);
