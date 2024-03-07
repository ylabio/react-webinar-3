import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, priceFormatter } from "../../utils";

function Controls({productsQuantity, productsTotalAmount, setIsModalOpen}) {
  let cartInfo = '';

  if (productsQuantity) {
    cartInfo = `${productsQuantity} ${plural(productsQuantity,
      {one: 'товар',
       few: 'товара',
       many: 'товаров'})} / ${priceFormatter(productsTotalAmount)} ₽`
  } else {
    cartInfo = 'пусто'
  }

  return (
    <div className='Controls'>
      <div className='Controls-container'>
        <p className='Controls-basket'>В корзине:</p>
        <p className='Controls-amount'>{cartInfo}</p>
      </div>
      <button className="Controls-button" onClick={() => setIsModalOpen(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setIsModalOpen: PropTypes.func,
  productsQuantity: PropTypes.number,
  productsTotalAmount: PropTypes.number,
};

Controls.defaultProps = {
  setIsModalOpen: () => {}
}

export default React.memo(Controls);
