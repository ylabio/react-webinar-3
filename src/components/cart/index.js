import React from "react";
import PropTypes, { bool, func } from "prop-types";
import './style.css';
import List from '../list'
import Head from "../head";
import usePopupClose from '../../hooks/usePopupClose.js'
import { calculateCartTotal, getRubPriceInt } from "../../utils";

function Cart
    ({itemsList, cartIsOpened, toggleCartVisibility, itemButtonsAction})
  {

  usePopupClose(cartIsOpened, toggleCartVisibility, 'Cart_opened');
  const {totalPrice} = calculateCartTotal(itemsList)

  const callbacks = {
    onCloseButton: () => {
      toggleCartVisibility()
    }
  }

  return (
    <div className={`Cart ${cartIsOpened ? 'Cart_opened' : ''}`}>
      <div className='Cart__container'>
        <Head title={"Корзина"}>
          <button
            onClick={callbacks.onCloseButton}
          >
            Закрыть
          </button>
        </Head>
        <div className='Cart__content'>
          {itemsList.length?
            <List
              itemsList={itemsList}
              itemButtonsAction={itemButtonsAction}
              itemButtonsName={'Удалить'}
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
  cartIsOpened: bool,
  toggleCartVisibility: func,
  itemButtonsAction: func
};

Cart.defaultProps = {
	toggleCartVisibility: () => {},
	itemButtonsAction: () => {},
	cartIsOpened: false
};


export default React.memo(Cart);
