import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { formatNumber, plural } from "../../utils";
import Cart from "../cart";
import Modal from "../modal";

function Controls({list, onRemoveFromCard}){

  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartInfo = {totalPrice: 0, totalCount: 0};
  const productsInCart = [];

  list.forEach(product => {
    if(!!product.count) {
      cartInfo.totalPrice += product.price * product.count;
      cartInfo.totalCount += product.count;
      productsInCart.push(product);
    }
  })

  const cartValue = cartInfo.totalCount 
    ? `${cartInfo.totalCount} ${plural(cartInfo.totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatNumber(cartInfo.totalPrice, { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}`
    : 'пусто...';

  const closeModalHandler = () => {
    setIsModalOpen(false);
  } 

  return (
    <div className='Controls'>
      <div className='Controls__title'>
        <span>В корзине:</span>
        <strong>{cartValue}</strong>
      </div>
      <button onClick={() => setIsModalOpen(true)}>Перейти</button>
      {isModalOpen && (
        <Modal onModalClose={closeModalHandler}>
          <Cart onModalClose={closeModalHandler}
                onRemoveFromCard={onRemoveFromCard} 
                list={productsInCart}
                totalPrice={cartInfo.totalPrice}/>
        </Modal>
      )}
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
};

Controls.defaultProps = {
  onRemoveFromCard: () => {},
}


export default React.memo(Controls);
