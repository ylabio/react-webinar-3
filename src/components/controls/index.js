import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';

function Controls(props) {

  const totalAmount = useMemo(
    () => {
      return props.cartList.reduce((sum, item) => sum + item.amount, 0);
    }, [props.cartList]
  );

  const totalPrice = useMemo(
    () => {
      return props.cartList.reduce((sum, item) => sum + item.price * item.amount, 0);
    }, [props.cartList]
  );

  return (
    <div className='Controls'>
      <div className='Controls-cart-info'>
        <div className='Controls-cart-info-title'>
          В корзине:
        </div>
        {
          totalAmount ?
            <div className='Controls-cart-info-total'>
              {`${totalAmount} ${plural(totalAmount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalPrice} ₽`}
            </div>
          :
            <div className='Controls-cart-info-total'>
              пусто
            </div>
        }
      </div>
      <button className='Controls-button' onClick={props.onClick}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onClick: PropTypes.func
};

Controls.defaultProps = {
  onClick: () => {}
}

export default React.memo(Controls);
