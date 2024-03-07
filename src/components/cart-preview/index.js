import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, formatPrice } from "../../utils";

function CartPreview(props) {
    return (
        <div className='CartPreview'>
            <div className="CartPreview-text">В корзине:</div>
            <div className="CartPreview-text"><b>{props.num ? props.num + ' ' + plural(props.num, {
                one: 'товар',
                few: 'товара',
                many: 'товаров'
            }) + ' / ' +
            formatPrice(props.sum) : 'пусто'}</b></div>
        </div>
    )
}

export default React.memo(CartPreview);