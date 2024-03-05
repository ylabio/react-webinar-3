import React from "react";
import PropTypes, { number, string } from 'prop-types';
import { plural } from "../../utils";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Controls({onShowBasket, isBasketControls, basketCounter}) {

  const cn = bem('Controls');

  return (
    <>
    {isBasketControls ? <div className={cn()}>
                        </div>
                      : <div className={cn()}>
                          <div>В Корзине:</div>
                          <div>
                            {basketCounter.productsQuantity ? 
                                                            `${basketCounter.productsQuantity} 
                                                            ${plural(basketCounter.productsQuantity, {one: 'товар', few: 'товара', many: 'товаров'})} / 
                                                            ${new Intl.NumberFormat("ru").format(basketCounter.productsCost)} ₽` 
                                                            : 'Пусто'}
                          </div>
                          <button onClick={() => onShowBasket()}>Перейти</button>
                        </div>}
    </>  
  )
}

Controls.propTypes = {
  onShowBasket: PropTypes.func,
  basketCounter: PropTypes.objectOf(number),
  isBasketControls: PropTypes.bool.isRequired,

};

Controls.defaultProps = {
  onShowBasket: () => {},
  isBasketControls: false,
  basketCounter: {
    productsQuantity: 0,
    productsQuantity: 0,
  }
}

export default React.memo(Controls);
