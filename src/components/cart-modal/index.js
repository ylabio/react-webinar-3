import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import './styles.css';

function CartModal(props) {
  const { onClose, children, cartTotalPrice, cartQuantity } = props;  

  const cn = bem('Cart'); 

  return (
          <div className={cn('container')} >
            <div className={cn()} onClick={(e) => e.stopPropagation()}>
              <div className={cn('header')}>
                <Head title='Корзина' />
                <button className={cn('close')} onClick={onClose}>
                  Закрыть
                </button>
              </div>
              {cartQuantity === 0 ? (
                <div className={cn('empty')}>В корзине ещё нет товаров</div>
              ) : (
                <div className={cn('list')}>{children}</div>
              )}
              <p className={cn('footer')}>
                <span>Итого</span>
                <span>{cartTotalPrice} ₽</span>
              </p>
            </div>
          </div> 
  );
}

CartModal.propTypes = {
  cartTotalPrice: PropTypes.string,
  cartQuantity: PropTypes.number,  
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

CartModal.defaultProps = {
  onClose: () => {},
};

export default React.memo(CartModal);
