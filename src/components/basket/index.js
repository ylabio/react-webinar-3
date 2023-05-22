import React from "react";
import './style.css';
import PropTypes from "prop-types";
import Head from "../head";

function Basket({ setBasket, basketTitle, children, list, total }) {

  return (
    <div className='Basket'>
      <div className='Basket-container'>
        <Head title={basketTitle}>
          <button className='Basket-close' onClick={() => setBasket(false)}>Закрыть</button>
        </Head>
        <div className="Basket-list">
          {children}
        </div>
        {list.length > 0 && <p className='Basket-price'>Итого<span>{total.toLocaleString(undefined, { useGrouping: true })} ₽</span></p>}
      </div>
    </div>
  )
}

Basket.propTypes = {
  setBasket: PropTypes.func,
};

Basket.defaultProps = {
  setBasket: () => { },
}


export default React.memo(Basket);