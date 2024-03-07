import React from "react";
import PropTypes from "prop-types";
import { formatPrice, plural } from '../../utils';
import './style.css';

function ItemCount({count, finalPrice}) {

    return (
        <div className={'ItemCount'}>
            <span>В корзине:&nbsp;&nbsp;</span>
            <b>
                {count} {plural(count, { one: 'товар', few: 'товара', many: 'товаров' })} / {formatPrice(finalPrice ?? 0)} ₽
            </b>
        </div>
    );
}

ItemCount.propTypes = {
    count: PropTypes.number,
    finalPrice: PropTypes.string
};

ItemCount.defaultProps = {
    count: 0,
    finalPrice: 0
}

export default React.memo(ItemCount);