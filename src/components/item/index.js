import React from 'react';
import PropTypes from 'prop-types';
import { numFormat } from '../../utils';
import './style.css';
import Buttons from "../buttons";

function Item({ variant = 'default', item=[], onAddToCart = () => {}, onDeleteFromCart = () => {} }) {

  return (
    <div className={'Item'}>
      <div className="Item-title">
        <b>{item.title}</b>
        <div className='Item-title-right'>
          <div>
            {variant === 'cart' &&
              <div>{item.count} шт</div>
            }
          </div>

          <span>{numFormat(item.price) + ' ₽'}</span>
        </div>
      </div>
      <div className="Item-actions">
        {variant === 'default' ?
            <Buttons onClick={() => onAddToCart(item.code)} variant="default">
              Добавить
            </Buttons>
          :
            <Buttons onClick={() => onDeleteFromCart(item.code)} variant="delete">
              Удалить
            </Buttons>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object,
  variant: PropTypes.string,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(Item);
