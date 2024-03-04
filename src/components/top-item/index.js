import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";
import Currency from "../../currencySymbol.js";

function TopItem({onBasket,onAmountProduct,onAmountPrice}) {
  var vAmountProduct = onAmountProduct();
  var vAmountPrice = onAmountPrice();
  return (
    <div className='ItemTop'>
      <div className='ItemTop-title'>
        В корзине:
      </div>
      <div className='ItemTop-amount-price-product'> 
        {vAmountProduct ? `${vAmountProduct} ${plural(vAmountProduct, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })}` : ''}
        {((vAmountProduct > 0 && vAmountPrice > 0) ? ' / ' : '')} 
        {(vAmountPrice != 0) ? <Currency currency="rub" value={vAmountPrice}/> : 'пусто'}
      </div>
      <div className='ItemTop-actions'>
        <button className='Button-shop' onClick={() => onBasket()}>Перейти</button>
      </div>
    </div>
  )
}

TopItem.propTypes = {
  onBasket: PropTypes.func,
  onAmountProduct: PropTypes.func,
  onAmountPrice: PropTypes.func
};

TopItem.defaultProps = {
  onBasket: () => {},
  onAmountProduct: () => {},
  onAmountPrice: () => {}
}

export default React.memo(TopItem);
