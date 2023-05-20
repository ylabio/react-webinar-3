import React, {useCallback} from "react";
import "./style.css";
import List from "../list";
import Head from "../head";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import CartItem from "../cart-item";

function Cart({cartList, DeleteCartItem, setIsModalOpen, cartInfo}) {

  const cn = bem("Cart");

  const callbacks = {
    cartItem: useCallback(
      (item) => (
        <CartItem item={item} onClick={DeleteCartItem} buttonText="Удалить"/>
      ),
      []
    ),
  };


  return (
    <>
      <Head title="Корзина">
        <button
          className={cn("button")}
          onClick={() => {
            setIsModalOpen(false);
          }}>Закрыть
        </button>
      </Head>
      <div className={cn("info")}>
        <List list={cartList} element={callbacks.cartItem}/>
      </div>
      <div className={cn("totalPrice")}>
        Итого <span>{cartInfo.totalPrice} ₽</span>
      </div>
    </>
  );
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number
    })
  ).isRequired,
  buttonText: PropTypes.string,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  DeleteCartItem: PropTypes.func,
  cartInfo: PropTypes.object

};


export default React.memo(Cart);