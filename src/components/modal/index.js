import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import List from '../list';

import './style.css'; 
import cancel_icon from '../../res/cancel_icon.svg'

function CartModal({isOpen = false, onClose = () => {}, cartList = [],  onRemoveItemFromCart = () => {}, cartTotal = 0}) {


    const cartListWithQuantities = cartList.map(item => ({
        ...item,
        quantity: item.quantity || 0, 
    }));

    if (!isOpen) return null; 
  
    return ReactDOM.createPortal(
      <div className="CartModal">
        <div className="CartModal-content">

            <div className='CartModal-head'>
                <h2>Корзина</h2>
                <img src={cancel_icon} className="CartModal-close" onClick={onClose} />

            </div>

            {cartListWithQuantities.length > 0 ? (
                <>
                    <List list={cartListWithQuantities} onRemoveItemFromCart={onRemoveItemFromCart} isCartMode={true}/>
                    {/* Я думал о том, чтобы добавить сюда мутированный item, содержащий только Итого: и цену, но мне показалось это слишком. 
                        CartModal-aligndiv для отступа слева, чтобы итого и ценник стояли под теми же значениями item-ов */}
                    <div className='CartModal-price'>
                        <div className='CartModal-aligndiv'></div>
                        <div className='CartModal-totals'>
                          <b>Итого:</b>
                          <b>{cartTotal} ₽ </b>
                        </div>
                    </div>
                </>
                
                ) : (
                <p>Корзина пуста</p>
            )}


  
        </div>
      </div>,
      document.body 
    );
  }

  CartModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cartList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemoveItemFromCart: PropTypes.func.isRequired,
    cartTotal:PropTypes.number
  };
  
export default React.memo(CartModal);
