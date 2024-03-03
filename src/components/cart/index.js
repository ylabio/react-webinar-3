import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import CartList from '../cart-list';
import './style.css';

function Cart(props) {
  
  const totalPrice = useMemo(
    () => {
      return props.cartList.reduce((sum, item) => sum + item.price * item.amount, 0);
    }, [props.cartList]
  );

  return (
    <div className='Cart'>
        <CartList cartList={props.cartList}
                  onDeleteItem={props.onDeleteItem}/>
        <div className='Cart-total'>
          <div>
            Итого
          </div>
          <div>
            {`${totalPrice} ₽`}
          </div>
        </div>
    </div>
  )
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(Cart);