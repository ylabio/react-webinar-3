import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ResultPrice({ title, price }) {

    return (
        <div className='ResultPrice'>
            <div className="ResultPrice-content">
                <b>{title}</b>
                <b>{price.toLocaleString() + ' ₽'}</b>
            </div>
        </div>
    );
}

ResultPrice.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default React.memo(ResultPrice);