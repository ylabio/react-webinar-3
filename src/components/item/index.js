import React from "react";
import PropTypes, { number } from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item(props) {

  const cn = bem('Item');
  
    const callbacks = {
      onAdd: () => {
        props.addItem(props.item.code);
      },
      onRemove: () => {
        props.removeItems(props.item.code);
      }
    }

    return (
      <div className={cn()}>
        <div className={cn('code')}>{props.item.code}</div>
        <div className={cn('title')}>
          {props.item.title}
        </div>
        {props.item.price !== undefined ? <>
                                            <div className={cn('price')}>
                                              {`${new Intl.NumberFormat("ru").format(props.item.price)} ₽`}
                                            </div>
                                            <div className={cn('actions')}>
                                              <button onClick={callbacks.onAdd}>
                                                Добавить
                                              </button>
                                            </div>
                                          </>
                                        : <>
                                            <div className={cn('total-price')}>
                                                {`${new Intl.NumberFormat("ru").format(props.item.totalPrice/props.item.quantity)} ₽`}
                                            </div>
                                            <div className={cn('quantity')}>
                                                {`${props.item.quantity} шт.`}
                                            </div>
                                            <div className={cn('actions')}>
                                              <button onClick={callbacks.onRemove}>
                                                Удалить
                                              </button> 
                                            </div>
                                          </>} 
      </div>
    );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  addItem: PropTypes.func,
  removeItems: PropTypes.func,
  basketCounter: PropTypes.objectOf(number)
};

Item.defaultProps = {
  item: {
    code: 1,
    title: 'noname',
    quantity: 0
  },
  addItem: () => {},
  removeItems: () => {},
  basketCounter: {
    productsQuantity: 0,
    productsQuantity: 0,
  }
}

export default React.memo(Item);