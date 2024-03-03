import React from "react";
import PropTypes from 'prop-types';
import Button from "../button";
import {plural} from "../../utils";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Controls({toggleModal, cartQuantity, totalAmount}) {
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
            / ${totalAmount} ₽` 
          }
        </span>
      </div>
      <Button text={'Перейти'} onAction={toggleModal}/>
    </div>
  )
}

Controls.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  cartQuantity: PropTypes.number,
  totalAmount: PropTypes.number,
};
Controls.defaultProps = {
  toggleModal: () => {
  },
}


export default React.memo(Controls);
