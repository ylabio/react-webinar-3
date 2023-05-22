import React from "react";
import PropTypes from 'prop-types';
import {plural, thousSeparator} from "../../utils";
import './style.css';

function Controls({showCart, cartSummary}) {
  
  const itemCount = cartSummary.cartUniqueCount; // amount of unique items in the cart
  const total = cartSummary.cartSum; // total sum in the cart

  const str = (itemCount > 0) 
    ? `${itemCount} ${plural(itemCount, {one: 'товар', few: 'товара', many: 'товаров'})} 
       / ${thousSeparator(total)} ₽`
    : 'пусто';

  return (
    <div className='Controls'>
      <div className='Controls-cart'>
        В корзине:
        <span className='bold-text margin-inline-20'>
          {str}
        </span>
      </div>
      <button onClick={() => showCart()}>Показать</button>
    </div>
  )
}

Controls.propTypes = {
  showCart: PropTypes.func,
  cartSummary: PropTypes.shape({
    cartUniqueCount: PropTypes.number,
    cartSum: PropTypes.number
  })
};

Controls.defaultProps = {
  showCart: () => {}
}

export default React.memo(Controls);
