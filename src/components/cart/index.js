import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import './styles.css';

function CartPortal({ children }) {
  const portalRoot = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(portalRoot);
    return () => {
      document.body.removeChild(portalRoot);
    };
  }, [portalRoot]);

  return createPortal(children, portalRoot);
}

function Cart(props) {
  const { isVisible, onClose, children, cartTotalPrice, cartQuantity } = props;

  const cn = bem('Cart');

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <CartPortal>
      {isVisible && (
        <div className={cn('overlay')} onClick={onClose}>
          <div className={cn('position')}>
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
          </div>
        </div>
      )}
    </CartPortal>
  );
}

Cart.propTypes = {
  cartTotalPrice: PropTypes.string,
  cartQuantity: PropTypes.number,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Cart.defaultProps = {
  onClose: () => {},
};

export default React.memo(Cart);
