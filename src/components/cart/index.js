import React, {useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';
import ModalLayout from "../modal-layout";
import List from "../list";
import CartItem from "../cart-item";
import CartTotal from "../cart-total";

function Cart({products, totalPrice, onClose, onCartRemove}){

  const callbacks = {
    renderItem: useCallback((item) => {
      return (<CartItem item={item} onCartRemove={onCartRemove}/>);
    }, []),
  }
  
  return (
    <ModalLayout title={'Корзина'} onClose={onClose}>
      <List renderItem={callbacks.renderItem} list={products} />
      <CartTotal totalPrice={totalPrice} products={products} />
    </ModalLayout>
  )
}

Cart.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onCartRemove: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    amount: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
};

export default React.memo(Cart);
