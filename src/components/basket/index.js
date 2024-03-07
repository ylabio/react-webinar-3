import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import Button from "../button";
import List from "../list";
import Vidget from "../vidget";
import './style.css';

function Basket({ cart, forModal, forItem }) {

  const cartList = Object.values(cart.state);
  // The target for rendering elements of list items
  const lsTarget = { name: "basket", ctrl: "Удалить"};

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
        <Vidget count={cart.count} title="Итого:" full={false}/>
      </div>
    </div>
  )
}

// Typechecking with PropTypes:
Basket.propTypes = {
  cart: PropTypes.shape({
    state: PropTypes.objectOf(PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      tocart: PropTypes.number,
    })),
    count: PropTypes.shape({
      goods: PropTypes.number,
      costs: PropTypes.number
    }),
  }).isRequired,
  forModal: PropTypes.func.isRequired,
  forItem: PropTypes.func.isRequired,
};

// Default values for properties:
Basket.defaultProps = {
  forModal: () => {},
  forItem: () => {},
};

export default React.memo(Basket);
