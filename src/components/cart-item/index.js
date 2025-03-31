import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ActionButton from '../action-button';

function CartItem({ item, deleteFromCart }) {

    const callbacks = {
        onDelete: () => {
            deleteFromCart(item.code);
        },
    };

    return (
        <div className='Item'>
            <div className="Item-title">
                <b>{item.title}</b>
            </div>

            <div className='Item-info'>
                <div className="Item-count">
                    {item.count} шт
                </div>

                <div className="Item-price">
                    {item.price.toLocaleString('ru-RU')} ₽
                </div>
            </div>

            <div className="Item-actions">
                <ActionButton type='delete' onClick={callbacks.onDelete} />
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        count: PropTypes.number,
    }).isRequired,
    deleteFromCart: PropTypes.func,
};

export default React.memo(CartItem);