import './style.css'
import React from "react";
import Head from "../head";
import PropTypes from "prop-types";

function BasketHead ({onCloseBasket}) {
  return (
    <>
      <div className={'basket-header'}>
        <Head title='Корзина'/>
        <button className={'basket-close'} onClick={onCloseBasket}>
          Закрыть
        </button>
      </div>
      <div className={'basket-section__empty'}/>
    </>
  )
}

BasketHead.propTypes = {
  onCloseBasket: PropTypes.func,
};

export default React.memo(BasketHead);