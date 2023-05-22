import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemCart(props) {

  const cn = bem('Item');

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDeleteItem(props.item.code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price', { cart: true })}>{(props.item.price).toLocaleString('ru-RU')} ₽</div>
      <div className={cn('count')}>{(props.item.count)} шт</div>
      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
};

ItemCart.defaultProps = {
  onDelete: () => { },
}

export default React.memo(ItemCart);
