import React from "react";
import Head from "../head";
import List from "../list";
import {numberFormat} from "../../utils";
import "./style.css";

function Cart({openWindow, cart, total, action}) {
  return (
    <div className='Cart'>
      <div className='Cart__dialog'>
        <Head className='Cart__header' title='Корзина'>
          <div className='Cart__header-close'>
            <button onClick={openWindow}>Закрыть</button>
          </div>
        </Head>
        <main className="Cart__body">
          {!!cart.length ? (
            <List list={cart} buttonText="Удалить" action={action}/>
          ) : (
            <h1 className="Cart__body-title">В корзине пусто!</h1>
          )}
        </main>
        {!!cart.length && (
          <footer className="Cart__footer">
            <div className="Cart__footer-total">Итого</div>
            <div className="Cart__footer-number">{numberFormat(total)}</div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default Cart;