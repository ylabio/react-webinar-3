import React from "react";
import PropTypes from "prop-types";
import './style.css';

function BasketItem(props) {
    const callbacks = {
        onClick: () => {
            props.onClick(props.item.code);
        },
    }

    return (
        <div className='BasketItem'>
            <div className='BasketItem-code'>{props.item.code}</div>
            <div className='BasketItem-title'>
                {props.item.title}
            </div>
            <div className="BasketItem-price"> {(props.item.price).toLocaleString('ru')} ₽ </div>
            <div className="BasketItem-amount"> {(props.item.count)} шт </div>
            <div className='BasketItem-actions'>
                <button onClick={callbacks.onClick}>
                    Удалить
                </button>
            </div>
        </div>
    );
}

BasketItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        selected: PropTypes.bool,
        count: PropTypes.number
    }).isRequired,
    onClick: PropTypes.func,
};

BasketItem.defaultProps = {
    onClick: () => {
    },
}

export default React.memo(BasketItem);