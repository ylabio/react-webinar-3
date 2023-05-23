import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({openCart, cart}){
  function getTitle(cart) {
    if (!cart.size) return 'Пусто';
    const result = Array.from(cart).reduce((acc, [ key, value ]) => {
      acc.price += key.price * value;
      acc.count += 1;
      return acc;
    }, { count: 0, price: 0 });
    return `${ result.count } ${ plural(result.count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${ result.price.toLocaleString() } ₽`
  }

  return (
    <div className='Controls'>
      <div>В корзине:</div>
      <div className='Controls-count'>{ getTitle(cart) }</div>
      <button onClick={() => openCart()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openCart: PropTypes.func
};

Controls.defaultProps = {
  openCart: () => {}
}

export default React.memo(Controls);
