import React, { useCallback } from "react";
import List from "./components/list";
import ProductCounter from "./components/product-counter";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Modal from "./components/modal";
import Item from "./components/item";
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, isCart } = store.getState();

  const callbacks = {
    onAddProductToCart: useCallback(
      (product) => {
        store.addProduct(product);
      },
      [store]
    ),

    onDeleteProductToCart: useCallback(
      (product) => {
        store.deleteProduct(product);
      },
      [store]
    ),

    onCloseCart: useCallback(() => {
      store.closeCart();
    }, [store]),

    onOpenCart: useCallback(() => {
      store.openCart();
    }, [store]),

    renderItem: useCallback(
      (item) => {
        return (
          <Item
            key={item.code}
            item={item}
            action={callbacks.onAddProductToCart}
          />
        );
      },
      [list]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <ProductCounter cart={cart} onOpenCart={callbacks.onOpenCart} />

      {isCart && (
        <Modal
          title="Корзина"
          closeElement="Закрыть"
          setIsVisible={callbacks.onCloseCart}
          children={
            <Cart
              cart={cart}
              onDeleteProductToCart={callbacks.onDeleteProductToCart}
            />
          }
        />
      )}
      <List list={list} renderItem={callbacks.renderItem} />
    </PageLayout>
  );
}

export default App;
