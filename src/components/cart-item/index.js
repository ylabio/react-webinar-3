import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CartItem({onDeleteCartItem, item}) {
    
    const cn = bem('CartItem');
    
    const callbacks = {
        onDelete: useCallback(() => {
          onDeleteCartItem(item.code);
        }, [onDeleteCartItem, item])
    };

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {item.code}
            </div>
            <div className={cn('title')}>
                {item.title}
            </div>
            <div className={cn('price')}>
                {Intl.NumberFormat('ru-RU').format(item.price)} ₽
            </div>
            <div className={cn('count')}>
                {item.count} шт
            </div>
            <div className={cn('actions')}>
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
    onDelete: () => {}
}

export default React.memo(CartItem);
