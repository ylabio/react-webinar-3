import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import List from '../list';
import Button from '../button';
import {formatNumber} from '../../utils';
import './style.css';

function CartDetails({onClose, items, cart, onRemove, cost}) {

  return (
      <div className='Cart-details'>
        <Head title='Корзина' withGap>
          <Button onClose={onClose}/>
        </Head>
        <List list={items}
            amounts={cart}
            onDelete={onRemove}
        />
        {items.length !== 0 &&
          <p className='Cart-details-total'>
            <span>Итого</span>
            <span className='Cart-details-total-sum'>{formatNumber(cost)}&nbsp;₽</span>
          </p>
        }
      </div>
  )
}

CartDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  cart: PropTypes.objectOf(PropTypes.number).isRequired,
  onRemove: PropTypes.func,
  cost: PropTypes.number.isRequired,
};

export default React.memo(CartDetails);