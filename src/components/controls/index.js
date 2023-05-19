import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";
import Head from "../head";
import List from "../list";
import PageLayout from "../page-layout";
import Layout from "../layout";
import Cart from "../cart";

function Controls({ cart, onRemoveItem }){
  const [ isOpen, setIsOpen ] = useState(false);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };
  function getTitle(cart) {
    if (!cart.size) return 'Пусто';
    const result = Array.from(cart).reduce((acc, [ key, value ]) => {
      acc.price += key.price * value;
      acc.count += value;
      return acc;
    }, { count: 0, price: 0 });
    return `${ result.count } ${ plural(result.count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${ result.price } ₽`
  }

  return (
    <div className='Controls'>
      <div>В корзине:</div>
      <div className='Controls-count'>{ getTitle(cart) }</div>
      <button onClick={() => openCart()}>Перейти</button>
      <>{ isOpen &&
        <Layout>
          <Cart title='Корзина' className='Cart' closeCart={closeCart}/>
        </Layout>
      }</>
    </div>

  )
}

Controls.propTypes = {
  onRemoveItem: PropTypes.func
};

Controls.defaultProps = {
  onRemoveItem: () => {}
}

export default React.memo(Controls);
