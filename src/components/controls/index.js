import {memo} from "react";
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ cart, total, basket, setBasket }) {
  return (
    <div className='Controls'>
      <p className='Controls-cart'>В корзине:
        <span className='Controls-price'>
          {cart.length ? `${cart.length} ${plural(cart.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${total.toLocaleString(undefined, { useGrouping: true })} ₽` : 'пусто'}
        </span>
      </p>
      <button onClick={() => !basket ? setBasket(true) : setBasket(false)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  modal: PropTypes.bool,
  setModal: PropTypes.func,
};

Controls.defaultProps = {
  setBasket: () => {}
}

export default memo(Controls);
