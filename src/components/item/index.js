import React from "react";
import PropTypes from "prop-types";
import './style.css';
import '../page-layout/style.css';
import {Format_Price} from "../../utils";

function Item(props){

    const callbacks = {
        onDosmth: (e) => {
            e.stopPropagation();
            props.onAction(props.item.code);
        }
    }
    const isQuantity = Object.hasOwn(props.item, 'quantity');

    return (
        <div className={'Item'}>
            <div className='Item-code'>{props.item.code}</div>
            <div className='Item-title'>
                <span>{props.item.title}</span>
                <span>{Format_Price(props.item.price)} &#8381;</span>
            </div>
            {isQuantity && <p className={'Item-quantity'}>{props.item.quantity} шт</p>}
            <div className='Item-actions'>
                <button className='button_pointer' onClick={callbacks.onDosmth}>
                    {isQuantity ? 'Удалить' : 'Добавить'}
                </button>
            </div>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number
    }).isRequired,
    onAddToCart: PropTypes.func
};

Item.defaultProps = {
    onAddToCart: () => {}
}

export default React.memo(Item);
