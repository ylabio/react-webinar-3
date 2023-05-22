import React, { useCallback } from "react";
import Cart from "./components/cart";
import CartPreview from "./components/cart-preview";
import Head from "./components/head";
import Item from "./components/item";
import List from "./components/list";
import Modal from "./components/modal";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();
  const [isCartModalOpen, setIsCartModalOpen] = React.useState(false);

  const callbacks = {
    onAdd: useCallback((code) => store.addItemToCart(code), [store]),
    onCartModalToggle: () => setIsCartModalOpen((prev) => !prev),
    onDelete: useCallback((code) => store.removeItemFromCart(code), [store]),
  };

  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />

      <CartPreview
        itemsCount={cart.total}
        itemsSum={cart.sum}
        onCartOpenClick={callbacks.onCartModalToggle}
      />

      {isCartModalOpen && (
        <Modal title="Корзина" onClose={callbacks.onCartModalToggle}>
          <Cart
            items={cart.items}
            itemsSum={cart.sum}
            onDelete={callbacks.onDelete}
          />
        </Modal>
      )}

      <List list={list} Item={Item} itemProps={{ onAdd: callbacks.onAdd }} />
    </PageLayout>
  );
}

export default App;
