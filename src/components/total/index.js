import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../../utils";
import './style.css';

function Total({ finalPrice }) {

    return (
        <div className='Total'>
            <b>Итого: </b>
            <b>{formatPrice(finalPrice ?? 0)} ₽</b>
        </div>
    )
};

Total.propTypes = {
    price: PropTypes.string
}

Total.defaultProps = {

}

export default React.memo(Total);