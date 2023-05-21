import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ModalWindow from '../modal-window';
import List from '../list';
import Head from '../head';
import { formatPrice } from '../../utils';

function Basket({ basket, onDeleteItemFromBasket, onCloseBasket, totalPrice }) {
  return (
    <ModalWindow onClose={() => onCloseBasket(false)}>
      <div className='Basket'>
        <div className='Basket-header'>
          <Head title='Корзина' />
        </div>
        {basket.length === 0 ? (
          <div className='Basket-empty'>Корзина пуста</div>
        ) : (
          <>
            <List
              list={basket}
              isBasket={true}
              onDeleteItemFromBasket={onDeleteItemFromBasket}
            />
            <div className='Basket-totalPrice'>
              <span>
                <strong>Итого</strong>
              </span>
              <span>
                <strong>{formatPrice(totalPrice)} &#8381;</strong>
              </span>
            </div>
          </>
        )}
      </div>
    </ModalWindow>
  );
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(Object),
  onDeleteItemFromBasket: PropTypes.func,
  onCloseBasket: PropTypes.func,
};

export default React.memo(Basket);
