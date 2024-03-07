import React, { useCallback, useState } from "react";
import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal/index";
/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  // code -> item count
  const [cart, setCart] = useState({});

function App({ store }) {
  // code -> item count
  const [cart, setCart] = useState({});

  const [modalActive, setModalActive] = useState(false);


  const list = store.getState().list;

  const callbacks = {
    onAddItemToCart: (code) => {
      let cnt = 1;
      if (code in cart) {
        cnt = cart[code] + 1;
      }
      setCart({
        ...cart,
        [code]: cnt,
      });
    },
    onDeleteItemFromCart: (code) => {
      const cartCpy = { ...cart };
      delete cartCpy[code];
      setCart(cartCpy);
    },
    
  };

  function calcTotal() {
    let total = 0;
    for (const codeStr in cart) {
      const code = +codeStr;
      const item = list.find((x) => x.code === code);
      if (!item) {
        continue;
      }
      const cnt = cart[codeStr];
      total += cnt * item.price;
    }
    return total;
  }

  // Object.values(itemsInCart).reduce((a, b) => a + b, 0);

  const cnt = Object.keys(cart).length;
  const total = calcTotal();
  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls setModalActive={setModalActive} cnt={cnt} total={total} />
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart} />
      <Modal
        active={modalActive}
        setActive={setModalActive}
        items={list}
        cart={cart}
        onDeleteItem={callbacks.onDeleteItemFromCart}
      />
      <Head title="Магазин" />
      <Controls setModalActive={setModalActive} cnt={cnt} total={total} />
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart} />
      <Modal
        active={modalActive}
        setActive={setModalActive}
        items={list}
        cart={cart}
        onDeleteItem={callbacks.onDeleteItemFromCart}
      />
    </PageLayout>
  );
}

export default App;
