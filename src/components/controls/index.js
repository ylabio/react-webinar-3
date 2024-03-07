import React from "react";
import PropTypes from 'prop-types';
import {plural, numberWithSpaces} from "../../utils";
import './style.css';

function Controls({modalOpen, store, cartList}) {
  return (
    <div className='Controls'>
      <div className='Controls-basket'>
        В корзине: <b>{cartList.length ? ` ${cartList.length} ${plural(cartList.length, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })}` : '0 товаров'} / {numberWithSpaces(store.cartPrice(cartList))} ₽</b>
      </div>
      <button className='Controls-button' onClick={() => modalOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  modalOpen: PropTypes.func,
  onCartPrice: PropTypes.number,
  cartList: PropTypes.arrayOf(PropTypes.object).isRequired
};

Controls.defaultProps = {
  modalOpen: () => {}
}
export default React.memo(Controls);