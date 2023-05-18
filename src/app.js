import React, {useCallback, useEffect, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cartItems = store.getState().cartItems;
  const totalPrice = store.getState().totalPrice;
  const [showCart, setShowCart] = useState(false);

  const callbacks = {
    onOpenCart: useCallback(() => {
      setShowCart(true);
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls onOpenCart={callbacks.onOpenCart}
                cartItems={cartItems}
                totalPrice={totalPrice} />
      <List list={list}
            cartItems={cartItems}
            showAddButton={true}
            store={store} />
      {showCart && (
        <Modal onClose={() => setShowCart(false)}>
          <Cart onClose={() => setShowCart(false)}
                cartItems={cartItems}
                totalPrice={totalPrice}
                store={store}/>
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
