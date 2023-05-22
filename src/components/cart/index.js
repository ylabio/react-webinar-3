import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Modal from '../modal';
import Head from '../head';
import List from '../list';

import { cn as bem } from '@bem-react/classname';
import { priceFormatter } from '../../utils';
import CartItem from '../сart-item';

function Cart(props) {
  const cn = bem('Cart');
  const callbacks = {
    onCartClose: props.onCartClose,
    onItemDelete: props.onItemDelete,
  };

  const TotalList = () => (
    <>
      <List
        list={props.cart.items}
        ListItem={CartItem}
        onItemAction={callbacks.onItemDelete}
      />
      <div className={cn('total')}>
        <b>
          Итого
          <span className={cn('total-price')}>
            {priceFormatter(props.cart.totalPrice)}
          </span>
        </b>
      </div>
    </>
  );

  return (
    <Modal>
      <div className={cn()}>
        <Head title="Корзина" classNames={[cn('head')]}>
          <div className={cn('actions')}>
            <button onClick={callbacks.onCartClose}>Закрыть</button>
          </div>
        </Head>
        {props.cart.itemsQuantity ? (
          <TotalList />
        ) : (
          <div className={cn('empty')}>В корзине ничего нет</div>
        )}
      </div>
    </Modal>
  );
}
Cart.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number,
        quantity: PropTypes.number,
      })
    ),
    itemsQuantity: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
  onCartClose: PropTypes.func,
  onItemDelete: PropTypes.func,
};
export default React.memo(Cart);
