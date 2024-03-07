import React from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';
import Button from "../button";

function Controls(props) {
  return (
    <div className='Controls'>
      <div className="Controls-cart">
        В корзине:
        <strong>{props.totalCount ? `${props.totalCount} ${plural(props.totalCount, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          maximumFractionDigits: 0,
          currency: 'RUB'})
          .format(props.totalPrice)} ` : 'пусто'}
        </strong> 
      </div>
      <Button onClick={() => props.openCart(true)} name='Перейти'/>
    </div>
  )
}

Controls.propTypes = {
  openCart: PropTypes.func,
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number
};

Controls.defaultProps = {
  openCart: () => {}
}

export default React.memo(Controls);
