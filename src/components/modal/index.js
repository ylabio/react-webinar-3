import React from 'react';
import BasketItem from '../basket-item/index.js'
import './style.css'
import Cross from '../../assets/icons/cross.svg'

function Modal ({ basketItems, onDeleteItem, hideModal }) {
    const itemsList = [];
    let sum = 0;

    basketItems.forEach((item) => {
        sum += item.price * item.count;
        itemsList.push(<BasketItem item={item} onDell={onDeleteItem} />);
    })

    return(
        <div className='modal-container' >
            <div className='modal'>
                <div className='cross' onClick={() => { hideModal() }}>
                    <Cross />
                </div>
                <div className='modal-title'>Корзина</div>
                <ul className="Modal-list">
                    {itemsList.map(item => (
                        <li key={item.code} className="Modal-list-item">
                            {item}
                        </li>
                    ))}
                </ul>
                <div className='total'>
                    <span>Итого:</span>
                    <span>{sum} ₽</span>
                </div>
            </div>
        </div>
    );
}

export default Modal;