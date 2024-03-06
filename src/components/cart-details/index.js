import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import List from '../list';
import CartItem from '../cart-item';
import Button from '../button';
import {formatNumber} from '../../utils';
import './style.css';

function CartDetails(props) {

  const renderListItem = useCallback(
    (item) => <CartItem item={item} onDelete={props.onRemove} />, [props.onRemove]);

  return (
      <div className='Cart-details'>
        <Head title='Корзина' withGap>
          <Button onClose={props.onClose}/>
        </Head>
        <div className='Cart-details_list'>
          <List list={props.cartItems}
              render={renderListItem}
          />
        </div>
        <p className='Cart-details_total'>
          <span>Итого</span>
          <span className='Cart-details_total-sum'>{formatNumber(props.cost)}&nbsp;₽</span>
        </p>
      </div>
  )
}

CartDetails.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  })).isRequired,
  cost: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(CartDetails);