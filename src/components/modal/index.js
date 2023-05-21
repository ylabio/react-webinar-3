import React from "react";
import "./style.css"
import Head from "../head";
import Item from "../item";
import PropTypes from "prop-types";


function Modal({handleModal, cart, deleteFromCart, totalPrice}) {

  return (
    <div className='Modal'>
      <div className='Modal-container'>
        <Head title='Корзина'>
          <button className='Modal-btn' onClick={handleModal}>
            Закрыть
          </button>
        </Head>
        <div className='Modal-content'>
          {Object.keys(cart).map((itemsCode) => {
            return cart[itemsCode] && <div key={itemsCode} className='List-item'>
              <Item
                item={cart[itemsCode][0]}
                count={cart[itemsCode].length}
                onAction={deleteFromCart}
                buttonTitle='Удалить'
              />
            </div>;
          })}
          <div className='Modal-total'>
            Итого <span>
           {totalPrice.toLocaleString()} ₽
        </span>
          </div>
        </div>
        </div>
    </div>
  )
}

Modal.propTypes = {
  handleModal: PropTypes.func,
  cart: PropTypes.object,
  deleteFromCart: PropTypes.func,
  totalPrice: PropTypes.number
}

export default React.memo(Modal)
