import React from "react";
import PropTypes, { func } from 'prop-types';
import { plural } from "../../utils";
import Button from "../button";
import './style.css';

function CartRow({ cart, cartSum, btn }) {

  return (
    <div className='Cart-row'>
      <div className='Cart-state'>В корзине:<strong>
        {cart.length > 0 ?
          ` ${cart.length} ${plural(cart.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${cartSum.toLocaleString()} ₽`
          : ' пусто'
        }
      </strong>
      </div>
      <div className="Cart-open">
        <Button title={btn.title} callback={btn.callback} />
      </div>
    </div>
  )
}

CartRow.propTypes = {
  cart: PropTypes.array,
  btn: PropTypes.object
};

export default React.memo(CartRow);
