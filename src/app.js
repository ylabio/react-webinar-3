import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Store from "./store";
import ModalLayout from "./components/modal-layout";
import {numFormat} from "./utils";
import CartBtn from "./components/cart/cart-button";
import CartItem from "./components/cart/cart-item";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @param cartS {Store}
 * @returns {React.ReactElement}
 */
function App({ store = new Store(), cartS = new Store()}) {
  const list = store.getState().list;

  const cartList = cartS.getState().list;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const callbacks = {
    onAddToCart: useCallback(
      (item) => {
        cartS.addOneItem(item);
      },
      [cartS],
    ),

    onDeleteFromCart: useCallback(
      (code) => {
        cartS.deleteItem(code);
      },
      [cartS],
    )
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls>
        <CartBtn
          cart={cartList}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        />
      </Controls>
      {isModalOpen &&
        <ModalLayout title="Корзина" setIsModalOpen={setIsModalOpen}>
          <List>
            {cartList.map(item =>
              <CartItem key={item.code} item={item} onDeleteFromCart={callbacks.onDeleteFromCart} />
            )}
          </List>
          <div className="cart-modal-totalCost">
            <div className="cart-modal-totalCost-content">
              <b>Итого:</b>
              <b>
                {numFormat(
                  cartList.reduce((prevVal, item) => prevVal + item.count * item.price, 0),
                ) + ' ₽'}
              </b>
            </div>
          </div>
        </ModalLayout>
      }

      <List list={list} onAddToCart={callbacks.onAddToCart} >
        {list.map(item =>
          <Item key={item.code} item={item} onAddToCart={callbacks.onAddToCart} />
        )}
      </List>
    </PageLayout>
  );
}

export default App;
