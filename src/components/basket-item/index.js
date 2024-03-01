import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function BasketItem(props) {

  const cn = bem('BasketItem');

  const callbacks = {
    onRemove: () => {
      props.removeItems(props.item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
          {`${new Intl.NumberFormat("ru").format(props.item.price)} ₽`}
      </div>
      <div className={cn('quantity')}>
          {`${props.item.quantity} шт.`}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onRemove}>
          Удалить
        </button> 
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    quantity: PropTypes.number
  }).isRequired,
  removeItems: PropTypes.func.isRequired
};

BasketItem.defaultProps = {
  removeItems: () => {}
}

export default React.memo(BasketItem);
