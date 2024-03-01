import React from "react";
import PropTypes, { number, string } from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item(props) {

  const cn = bem('Item');
  
    const callbacks = {
      onAdd: () => {
        props.addItem(props.item);
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
        <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>
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
    quantity: PropTypes.number
  }).isRequired,
  addItem: PropTypes.func.isRequired,
  basketCounter: PropTypes.objectOf(number).isRequired
};

Item.defaultProps = {
  item: {
    code: 1,
    title: 'noname',
    quantity: 0
  },
  addItem: () => {
  },
  basketCounter: {
    productsQuantity: 0,
      productsQuantity: 0,
  }
}

export default React.memo(Item);