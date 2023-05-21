import React from 'react';
import Head from '../head';
import List from '../list';
import './style.css';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { priceFormat } from '../../utils';
import Modal from '../modal';

function Cart({ cart, onDeleteCartItem, onCloseCart, totalCost }) {
  const cn = bem('Cart');

  return (
    <Modal>
      <div className={cn()}>
        <Head title={'Корзина'}>
          <button className={cn('closeButton')} onClick={onCloseCart}>
            Закрыть
          </button>
        </Head>
        <div className={cn('emptySpace')}></div>
        <List
          list={cart}
          onClick={onDeleteCartItem}
          buttonTitle={'Удалить'}
          isListItem={false}
        />
        <div className={cn('totalCost')}>
          <span>Итого</span>
          <span>{priceFormat(totalCost)}</span>
        </div>
      </div>
    </Modal>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
  onDeleteCartItem: PropTypes.func,
  onCloseCart: PropTypes.func,
  totalCost: PropTypes.number,
};

export default React.memo(Cart);
