import './style.css'
import React from "react";
import Head from "../head";
import {plural, priceFormatCreator} from "../../utils";
import PropTypes from "prop-types";

function MarketHead({totalPrice, totalItems, onOpenModal}) {
  return (
    <>
      <Head title={'Магазин'}/>
      <div className={'market-head__info'}>
        <div>
          В корзине:
          <span>
              {
                totalItems
                  ? `${totalItems} ${plural(totalItems, {
                    one: 'товар',
                    few: 'товара',
                    many: 'товаров'
                  })} / ${priceFormatCreator(totalPrice)} ₽`
                  : 'пусто'
              }
            </span>
        </div>
        <div className={'market-head__btn'}>
          <button onClick={onOpenModal}>Перейти</button>
        </div>
      </div>
    </>
  )
}

MarketHead.propTypes = {
  totalPrice: PropTypes.number,
  totalItems: PropTypes.number,
  onOpenModal: PropTypes.func
};

export default React.memo(MarketHead);
