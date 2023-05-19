import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem({ onDeleteCartItem, item }) {

    const callbacks = {
        onDelete: useCallback(() => {
            onDeleteCartItem(item.code);
        }, [onDeleteCartItem, item])
    };

    return (
        <div className='CartItem'>
            <div className='CartItem-number'>
                {item.code}
            </div>
            <div className='CartItem-title'>
                {item.title}
            </div>
            <div className='CartItem-price'>
                {(item.price).toLocaleString('ru-RU')} ₽
            </div>
            <div className='CartItem-count'>
                {item.count} шт
            </div>
            <div className='CartItem-actions'>
                <button onClick={callbacks.onDelete}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.string,
        count: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func.isRequired
}

CartItem.defaultProps = {
    onDelete: () => { }
}

export default React.memo(CartItem);
