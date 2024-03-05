import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head/index';
import './style.css';

function CartModal({data, children, onClose}) {
  return (
    <>
      <button className='Cart-modal-close' onClick={onClose}>Закрыть</button>
      <Head title='Корзина' />
      <div className='Cart-modal-items'>
        {data.length && children
          ? <>
            {children}
          </>
          : <p className='Cart-modal-empty'>Корзина пуста</p>}
        </div>
    </>
  )
}

CartModal.propTypes = {
  data: PropTypes.array,
  children: PropTypes.node,
  onClose: PropTypes.func
};

CartModal.defaultProps = {
  data: [],
  onClose: () => {}
}

export default React.memo(CartModal);