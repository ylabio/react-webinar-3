import React from "react";
import PropTypes from "prop-types";
import './style.css';
import List from "../list";
import { priceFormatter } from "../../utils";
import Modal from "../UI/Modal";

function Cart({setIsModalOpen, productsInCart, productsTotalAmount, deleteItem}) {

const cartСontents = () => {
  if (productsTotalAmount) {
    return (
      <div className='Cart-amount'>
        <div>Итого</div>
        <div>{`${priceFormatter(productsTotalAmount)} ₽`}</div>             
      </div>
    )
  } else {
    return <p className="Cart-empty">К сожалению, корзина пуста</p>
  }
}

  return (
    <Modal title={'Корзина'} setIsModalOpen={setIsModalOpen}>
      <List
      list={productsInCart}
      buttonAction={deleteItem}
      buttonLabel={"Удалить"}/>
      {cartСontents()}
    </Modal>
  )
}

Cart.propTypes = {
  setIsModalOpen: PropTypes.func,
  deleteItem: PropTypes.func,
  productsInCart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  productsTotalAmount: PropTypes.number
};

Cart.defaultProps = {
  setIsModalOpen: () => {},
}


export default React.memo(Cart);