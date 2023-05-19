import React from "react";
import './style.css';

function Cart({ onClose, cartItems, setCartItems }){

  const handleDelete = (code) => {
    const updatedCartItems = cartItems.filter(item => item.code !== code);
    setCartItems(updatedCartItems);
  }

  return (
    <div className='Cart'>
      <div className='Cart-content'>
        <h2>Корзина</h2>
        <button onClick={() => onClose()}>Закрыть</button>
        <div className='List'>{
          cartItems.map(item =>
            <div key={item.code} className='List-item'>

              <div className={'Item'}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title}</div>
                <div className='Item-actions'>
                  <button onClick={() => handleDelete(item.code)}>Удалить</button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart;