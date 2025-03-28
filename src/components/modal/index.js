import React, { useEffect } from 'react';
import './style.css';
const Modal = (props) => {
   const {order, onDeleteItem, onClose, total} = props;
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        
        document.addEventListener('keydown', handleEsc);
        
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div className='modal-overlay' onClick={handleOverlayClick}>
        <div className="modal">
            <div className="modal-content">
                <h3>Корзина</h3>
                <ul className='basket-list'>
                    {order.items.map(item => (
                        <li key={item.code} className='basket-item'>
                            <span className='item-title'><b>{item.title}</b></span>
                            <div className='item-info'>
                            <span className='item-count'>{item.count} шт</span>
                            
                            <div className='item-price-delete'>
                            <span className='item-price'>{item.price.toLocaleString('ru-RU') + ' ₽'}</span>
                                
                            <button className='item-delete' onClick={() => onDeleteItem(item.code)}>Удалить</button>
                            </div>
                            </div>
                        </li>
                    ))}
                    
                </ul>
                <span className="basket-price">
  <b>Итого:</b> <b>{total.toLocaleString('ru-RU')} ₽</b>
</span>
                <button className='modal-close' onClick={onClose}></button>
            </div>
        </div>
        </div>
    );
}

export default Modal