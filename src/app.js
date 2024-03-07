import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalOverlay from "./components/modal-overlay";
import Cart from "./components/cart";
import Modal from "./components/modal";
import CartInfo from "./components/cart-info";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModal, setIsModal] = React.useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartItemsCount = store.getState().cartItemsCount;
  const cartTotalPrice = store.getState().cartTotalPrice;
  const callbacks = {
    /**
     * Колбек-Функция показа/скрытия модалки
     * @returns
     */
    onToggleCart: useCallback(() => {
      setIsModal(!isModal);
    }, [isModal]),

    /**
     * Колбек-Функция добавления товара в корзину
     * @param {Number} code - код товара, который нужно добавить в корзину
     * @returns
     */
    onAddItem: useCallback(
      (code) => {
        store.addItem(code);
      },
      [store]
    ),

    /**
     * Колбек-Функция удаления товара в корзины
     * @param {Number} code - код товара, который нужно удалить из корзины
     * @returns
     */
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls title={"Перейти"} onToggleCart={callbacks.onToggleCart}>
        <CartInfo
          cartItemsCount={cartItemsCount}
          cartTotalPrice={cartTotalPrice}
        />
      </Controls>
      <List
        list={list}
        buttonFunction={callbacks.onAddItem}
        buttonTitle={"Добавить"}
      />
      {isModal && (
        <>
          <Modal>
            <Cart
              cart={cart}
              onDeleteItem={callbacks.onDeleteItem}
              onToggleCart={callbacks.onToggleCart}
              cartItemsCount={cartItemsCount}
              cartTotalPrice={cartTotalPrice}
            />
          </Modal>
          <ModalOverlay onModalOverlayClick={callbacks.onToggleCart} />
        </>
      )}
    </PageLayout>
  );
}

export default App;
