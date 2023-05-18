import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import List from '../list';
import './style.css';

function Cart({cart, priceAll, onToggleModal, onDeleteFromCart}) {
  return (
    <div className='Cart'>
        <Head title='Корзина' onToggleModal={onToggleModal} />
        {cart.length ? <List list={cart} isCart={true} onDeleteFromCart={onDeleteFromCart}/> : <span className='Cart-empty'>Корзина пуста</span>}
        {cart.length ? <span className='Cart-total'><span>Итого</span><span>{priceAll}</span></span> : null}
    </div>
  )
}

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number
    })).isRequired,
    priceAll: PropTypes.string
};

export default React.memo(Cart)