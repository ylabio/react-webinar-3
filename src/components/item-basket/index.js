import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Currency from "../../currencySymbol.js";

function ItemBasket(props) {
  return (
     <div className='Item'>
        <div className='Item-code'>{props.item.code}</div>
        <div className='Item-title-basket'>
          {props.item.title} 
        </div>
        <div className='Item-price-basket'>
          <Currency currency="rub" value={props.item.price}/>
        </div>
        <div className='Item-q-product'>
          {props.qproduct}
          {' шт'}
        </div>
        <div className='Item-actions'>
          <button onClick={() => props.onFunc(props.item.code)}>
            Удалить
          </button>
        </div>
      </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  qproduct: PropTypes.number,
  onFunc: PropTypes.func
};

ItemBasket.defaultProps = {
  onFunc: () => {
  },
}

export default React.memo(ItemBasket);
