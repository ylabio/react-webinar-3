import React from "react";
import PropTypes, { func } from 'prop-types';
import { plural } from "../../utils";
import Button from "../button";
import './style.css';

function CartRow({ cart, onOpenModal }) {

  return (
    <div className='Cart-row'>
      <div className='Cart-state'>В корзине:<strong>
        {cart.length > 0 ?
          ` ${cart.length} ${plural(cart.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${cart.reduce((acc, item) => acc + item.price * item.count, 0).toLocaleString()} ₽`
          : ' пусто'
        }
      </strong>
      </div>
      <div className="Cart-open">
        <Button title='Перейти' callback={onOpenModal} />
      </div>
    </div>
  )
}

CartRow.propTypes = {
  cart: PropTypes.array,
  onOpenModal: PropTypes.func
};

CartRow.defaultProps = {
  onOpenModal: () => { }
}

export default React.memo(CartRow);
