import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from '../../utils';
import './style.css';

function BasketItem(props) {

    return (
        <div className={'BasketItem'}>
            <div className='BasketItem-code'>{props.item.code}</div>
            <div className='BasketItem-title'>
                {props.item.title}
            </div>
            <div className='BasketItem-price'>{formatPrice(props.item.price)} ₽</div>
            {props.item.count && <div className='Item-count'>{props.item.count} шт.</div>}
            <div className='BasketItem-actions'>
                <button className="BasketItem-button" onClick={() => props.onAction(props.item.code)}>
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
        price: PropTypes.number
    }).isRequired,
    onAction: PropTypes.func,
};

BasketItem.defaultProps = {
    basket: []
}

export default React.memo(BasketItem);
