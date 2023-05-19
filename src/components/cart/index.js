import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { getSum } from "../../utils";
import Head from "../head";

function Cart({cart, onDeleteItem, isModalVisible}){
  return (
    <div className={`Cart ${isModalVisible ? 'Cart--visible' : ''}`}>
      <Head title='Корзина'></Head>
      <button>Закрыть</button>
      <div className='List'>
        {
          cart.map(item =>
            <div key={item.code} className='List-item'>
              <div className='Item'>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                  {item.title}
                </div>
                <div className='Item-price'>{item.price + '₽'}</div>
                <div>{item.quantity}шт</div>
                <div className='Item-actions'>
                  <button onClick={() => onDeleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <div>Итого {cart.length > 0 ? getSum(cart.map(item => item.price * item.quantity )) : 0}</div>
    </div>
  )
}

// Controls.propTypes = {
//   onAdd: PropTypes.func
// };

// Controls.defaultProps = {
//   onAdd: () => {}
// }

export default React.memo(Cart);
