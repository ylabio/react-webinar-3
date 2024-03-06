import React from "react";
import PropTypes from 'prop-types';
import Button from "../button";
import {plural} from "../../utils";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { formatPrice } from "../../utils";

function Controls({onAction, cartQuantity, totalAmount}) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        В корзине: 
        <span className={cn('items')}>
          {cartQuantity == 0 ? 'пусто' : 
            `${cartQuantity} 
            ${plural(cartQuantity, {
              one: 'товар',
              few: 'товара', 
              many: 'товаров' 
            })}
            / ${formatPrice(totalAmount)} ₽` 
          }
        </span>
      </div>
      <Button text={'Перейти'} onAction={onAction}/>
    </div>
  )
}

Controls.propTypes = {
  onAction: PropTypes.func.isRequired,
  cartQuantity: PropTypes.number,
  totalAmount: PropTypes.number,
};


export default React.memo(Controls);
