import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import Button from "../button";
import List from "../list";
import { format } from '../../utils';
import './style.css';

/* COMPONENTS TODO:
component for basket:
 - component vidget */

function Basket({list, forModal, forItem, summ}) {

  const cartList = list.filter((item) => Boolean(item.tocart));
  // The target for rendering elements of list items
  const lsTarget = { name: "basket", ctrl: "Удалить"};
  const numForm = format(summ);

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
        <div className='Basket-summary-title'>Итого:
          <strong className='Basket-summary-inform'>{`${numForm} ₽`}</strong>
        </div>
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
  summ: PropTypes.number.isRequired,
};

// Default values for properties:
Basket.defaultProps = {
  forModal: () => {},
  forItem: () => {},
};

export default React.memo(Basket);
