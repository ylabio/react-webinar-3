import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Currency from "../../currencySymbol.js";

function ItemShop(props) {
  return (
      <div className='Item'>
        <div className='Item-code'>{props.item.code}</div>
        <div className='Item-title'>
          {props.item.title} 
        </div>
        <div className='Item-price'>
          <Currency currency="rub" value={props.item.price}/>
        </div>
        <div className='Item-actions'>
          <button onClick={() => props.onFunc(props.item.code)}>
            Добавить
          </button>
        </div>
      </div>
  )
}

ItemShop.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onFunc: PropTypes.func
};

ItemShop.defaultProps = {
  onFunc: () => {
  },
}

export default React.memo(ItemShop);
