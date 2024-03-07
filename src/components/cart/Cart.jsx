import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { formatPrice } from '../../utils';
import CartItem from "../cartItem";
import Head from "../head";
import List from "../list";
import Button from "../button";

function Cart({cart, cartSum, onRemoveItem, onShowModal}) {
  const cn = bem('Cart');

  return (
    <>
    <Head title="Корзина">
      <Button title="Закрыть" onClick={()=>onShowModal(false)}/>
    </Head>
    <div className={cn()}>
      <List
          list={cart}
          makeItem={(item) => <CartItem item={item} onClick={onRemoveItem}/>}
      />
      {Boolean(cart.length) &&
        <div className={cn("sum")}>
          <b>Итого</b>
          <b>{formatPrice(cartSum)}</b>
        </div>
      }
    </div>
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  cartSum: PropTypes.number,
  onRemoveItem: PropTypes.func,
  onShowModal: PropTypes.func
};

Cart.defaultProps = {
  onRemoveItem: () => {},
  onShowModal: () => {}
}

export default React.memo(Cart);
