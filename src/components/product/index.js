import React from "react";
import PropTypes from 'prop-types';

import {numberWithSpaces} from "../../utils";
import './style.css';

function Product({item, onDelete}) {
    return (
        <div className="Product">
            <div className="Product-code">{item.code}</div>
            <div className="Product-title">{item.title}</div>
            <div className="Product-price">{numberWithSpaces(item.price)} ₽</div>
            <div className="Product-quantity">{item.amount} шт</div>
            <div className="Product-actions">
                <button className="Product-actions__button" onClick={() => onDelete(item.code)}>Удалить</button>
            </div>
        </div>
    )
}

Product.propTypes = {
    item: PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      amount: PropTypes.number
    }).isRequired,
    onDelete: PropTypes.func
};
  
Product.defaultProps = {
    onDelete: () => {
    }
}

export default React.memo(Product);