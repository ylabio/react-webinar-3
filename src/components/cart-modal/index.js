import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';

// Компоненты
import CrossIcon from '../cross-icon';
import List from '../list';

function CartModal({ setIsOpen, cart, deleteFromCart, totalPrice }) {
    const overlayRef = useRef(null);
    const crossRef = useRef(null);

    const handleCloseModal = e => {
        if (e.target === overlayRef.current || crossRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    return (
        <div
            ref={overlayRef}
            className='modal-overlay'
            onClick={e => handleCloseModal(e)}
        >
            <div className='modal'>
                <div className='modal-header'>
                    <h2 className='modal-header__title'>Корзина</h2>
                    <CrossIcon ref={crossRef} className={'delete-btn'} onClick={e => handleCloseModal(e)} />
                </div>

                <div className='modal-body'>
                    <List list={cart} type='cart' deleteFromCart={deleteFromCart} />
                </div>
                <div className='modal-footer'>
                    <p>Итого:</p>
                    {totalPrice.toLocaleString('ru-RU')} ₽
                </div>

            </div>
        </div>
    )

}

export default React.memo(CartModal);

CartModal.PropTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,

        })
    ).isRequired,
    deleteFromCart: PropTypes.func.isRequired,
    totalPrice: PropTypes.number.isRequired,
}