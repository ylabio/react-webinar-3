import React from "react";
import PropTypes from "prop-types";
import './style.css';
import List from "../list";
import { priceFormatter } from "../../utils";

function ModalCart({setIsModalOpen, productsInCart, productsTotalAmount, deleteItem}) {
  let productsTotalAmountText = ''
  
  if (productsTotalAmount) {
    productsTotalAmountText = `${priceFormatter(productsTotalAmount)} ₽`
  } else {
    productsTotalAmountText = 'К сожалению, корзина пуста'
  }

  return (
    <div className='ModalCart'>
      <div className='ModalCart-container'>
        <div className='ModalCart-header'>
          <p className='ModalCart-text'>Корзина</p>
          <button onClick={() => setIsModalOpen(false)}>Закрыть</button>
        </div>
        <div className='ModalCart-content'>
          <List
          list={productsInCart}
          buttonAction={deleteItem}
          buttonLabel={"Удалить"}/>
          <div className='ModalCart-amount'>
            {productsTotalAmount ? <div>Итого</div> : ''}              
            <div>{productsTotalAmountText}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

ModalCart.propTypes = {
  setIsModalOpen: PropTypes.func,
  deleteItem: PropTypes.func,
  productsInCart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  productsTotalAmount: PropTypes.number
};

ModalCart.defaultProps = {
  setIsModalOpen: () => {},
}


export default React.memo(ModalCart);