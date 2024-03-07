import React from 'react';
import PropTypes from 'prop-types';
import {plural, separatingNumberSpaces} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import './style.css';


function Controls(props) {

  const cn = bem('Controls');

  const callbacks = {
    onShowCart: () => {
      props.onShowCart(props.nameCartModal);
      props.disabledScroll();
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        В корзине: 
        <span>
          {props.totalCart.totalProduct
            ? `${separatingNumberSpaces(props.totalCart.totalProduct)} 
              ${plural(props.totalCart.totalProduct, {one: 'товар', few: 'товара', many: 'товаров'})} / 
              ${separatingNumberSpaces(props.totalCart.totalPrice)} ₽`
            : `пусто`
          }
        </span>
      </div>
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.onShowCart}>
          Перейти
        </button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  totalCart: PropTypes.shape({
    totalProduct: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
  nameCartModal: PropTypes.string,
  onShowCart: PropTypes.func,
  disabledScroll: PropTypes.func
};

Controls.defaultProps = {
  onShowCart: () => {},
  disabledScroll: () => {}
}

export default React.memo(Controls);
