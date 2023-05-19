import React from "react";
import Head from "../head";
import "./style.css";

function Cart({openWindow}) {
  return (
    <div className='Cart'>
      <div className='Cart__dialog'>
        <Head className='Cart__header' title='Корзина'>
          <div className='Cart__header-close'>
            <button onClick={openWindow}>Закрыть</button>
          </div>
        </Head>
      </div>
    </div>
  );
}

export default Cart;