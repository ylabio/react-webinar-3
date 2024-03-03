import React from 'react';
import './style.css';
import List from '../list';

function Modal({ onModal, basket, onDelete }) {

    const total = basket.reduce((acc, item) => {
        return acc + item.price * item.count
    }, 0)

    return (
        <div className='Modal-bg'>
            <div className='Modal-body'>
                <div className='Modal-header'>
                    <p className='Modal-title'>Корзина</p>
                    <button onClick={onModal}>Закрыть</button>
                </div>
                <List list={basket} onClick={onDelete} isInBasket={true} />
                <div className='Modal-total-cost'><span>Итого</span> <span className='Modal-sum'>{total}₽</span></div>
            </div>
        </div>
    )
}

export default React.memo(Modal)