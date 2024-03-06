import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import Button from "../button";
import List from "../list";
import Vidget from "../vidget";
import { format } from '../../utils';
import './style.css';

function Basket({list, forModal, forItem, cart}) {

  const cartList = list.filter((item) => Boolean(item.tocart));
  // The target for rendering elements of list items
  const lsTarget = { name: "basket", ctrl: "Удалить"};
  const numForm = format(cart.costs);

  return (
    <div className='Basket'>
      <Head tag='h2' title='Корзина'>
        <Button style="Button_basket" callback={forModal}>
          Закрыть
        </Button>
      </Head>
      <div className='Basket-list'>
        <List list={cartList} callback={forItem} target={lsTarget}/>
      </div>
      <div className="Basket-summary">
        <Vidget cart={cart} title="Итого:" full={false}/>
      </div>
    </div>
  )
}

// Typechecking with PropTypes:
Basket.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    tocart: PropTypes.number,
  })).isRequired,
  forModal: PropTypes.func.isRequired,
  forItem: PropTypes.func.isRequired,
  cart: PropTypes.shape({
    goods: PropTypes.number,
    costs: PropTypes.number
  }).isRequired,
};

// Default values for properties:
Basket.defaultProps = {
  forModal: () => {},
  forItem: () => {},
  cart: { goods: 0, costs: 0 },
};

export default React.memo(Basket);
