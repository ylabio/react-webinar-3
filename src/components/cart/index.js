import React from "react";
import PropTypes, { func } from "prop-types";
import './style.css';
import List from '../list'
import Head from "../head";
import { getRubPriceInt } from "../../utils";
import CartItem from "../cart-item";

function Cart ({itemsList, itemButtonsAction, cartTotal}) {

  const {totalPrice} = cartTotal

  return (
      <div className='Cart'>
        <Head title={"Корзина"}/>
        <div className='Cart__content'>
          {itemsList.length?
            <List
              itemsList={itemsList}
              itemButtonsAction={itemButtonsAction}
              itemButtonsName={'Удалить'}
              renderListItem={(props) => <CartItem {...props} />}
            />
            :
            <p className='Cart__empty-cart-info'>
              В корзине пока пусто
            </p>
          }
        </div>
        <div className='Cart__total' >
          <p className='Cart__total-text'>Итого</p>
          <p className='Cart__total-text'>
            {getRubPriceInt(totalPrice)}
          </p>
        </div>
      </div>
  );
}

Cart.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired,
  itemButtonsAction: func,
  cartTotal: PropTypes.shape({
    totalQuantity: PropTypes.number,
    totalPrice: PropTypes.number
  }).isRequired
};

Cart.defaultProps = {
	itemButtonsAction: () => {},
};


export default React.memo(Cart);
