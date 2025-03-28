import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice, getTotalPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';

function ModalLayout({ children, closeModal, cartList }) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('dialog')}>
        <div className={cn('content')}>
          <div className={cn('head')}>
            <h1>Корзина</h1>
            <button onClick={closeModal} className={cn('close')}></button>
          </div>
          <div className={cn('body')}>
            { children }
            <div className={cn('total')}>
              <div className={cn('total-info')}>
                <p>Итого:</p>
                <p>{formatPrice(getTotalPrice(cartList))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func,
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
      price: PropTypes.number,
    }).isRequired,
  )
};

export default React.memo(ModalLayout);