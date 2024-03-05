import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head/index';
import List from '../list/index';
import CartSum from '../cart-sum/index';
import CartItem from '../cart-item/index';
import './style.css';

function CartModal({data, totalSum, onClose, onDelete}) {
  return (
    <>
      <button className='Cart-modal-close' onClick={onClose}>Закрыть</button>
      <Head title='Корзина' />
      <div className='Cart-modal-items'>
        {data.length > 0
          ? <>
            <List list={data}
                  item={CartItem}
                  onClick={onDelete}/>
            <CartSum totalSum={totalSum} />
          </>
          : <p className='Cart-modal-empty'>Корзина пуста</p>}
        </div>
    </>
  )
}

CartModal.propTypes = {
  data: PropTypes.array,
  totalSum: PropTypes.number,
  onClose: PropTypes.func,
  onDelete: PropTypes.func
};

CartModal.defaultProps = {
  data: [],
  totalSum: 0,
  onClose: () => {},
  onDelete: () => {}
}

export default React.memo(CartModal);