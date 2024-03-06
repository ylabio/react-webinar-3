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
  const callbacks = {

    /**
     * Функция подсчета общей суммы товаров в корзине
     * @returns {Number}
     */
    calculateSum: () => {
      return cart.reduce((acc, piece) => acc + piece.price * piece.count, 0);
    },

    /**
     * Функция подсчета количества товаров в корзине
     * @returns {Number}
     */
    calculateItems: () => {
      return cart.length;
    },

    /**
     * Функция показа/скрытия модалки
     * @returns
     */
    onToggleCart: useCallback(() => {
      setIsModal(!isModal);
    }, [isModal]),

    /**
     * Функция добавления товара в корзину
     * @param {Object} item - объект с информацией о товаре
     * @returns
     */
    onAddItem: useCallback(
      (item) => {
        store.addItem(item);
      },
      [store]
    ),

    /**
     * Функция удаления товара в корзины
     * @param {Object} item - объект с информацией о товаре
     * @returns
     */
    onDeleteItem: useCallback(
      (item) => {
        store.deleteItem(item);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls title={"Перейти"} onToggleCart={callbacks.onToggleCart}>
        <CartInfo
          calculateItems={callbacks.calculateItems}
          calculateSum={callbacks.calculateSum}
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
              calculateSum={callbacks.calculateSum}
              calculateItems={callbacks.calculateItems}
            />
          </Modal>
          <ModalOverlay onModalOverlayClick={callbacks.onToggleCart} />
        </>
      )}
    </PageLayout>
  );
}

export default App;
