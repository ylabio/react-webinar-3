import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import './index.css';
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cartList, totalPrice, cartListLength} = store.getState();
  let [isModalVisible, changeIsModalVisible] = useState(false);

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    },[store]),

    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    },[store]),
    // Заменил старую функцию handleClick на handleOpenModal и handleCloseModal,
    // которая добавляет стиль к body для корректного отображения скролла
    // скорее всего это не корректо, но это то до чего я додумался)

    handleOpenModal: useCallback(() => {
      changeIsModalVisible(true);
      document.body.classList.add('no-scroll');
    },[store]),

    handleCloseModal: useCallback(() => {
      changeIsModalVisible(false);
      document.body.classList.remove('no-scroll');
    },[store]),
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls cartListLength={cartListLength}
                  totalPrice={totalPrice}
                  handleClick={callbacks.handleOpenModal}
        />
        <List list={list}
              onChangeItemInCart={callbacks.onAddItemToCart}
        >
          <Item/>
        </List>
      </PageLayout>
      {isModalVisible && // Переменная isModalVisible используется для отображения модального окна
      // document.body.App.style.overflow = 'hidden'
        <Modal>
          <Cart list={cartList}
                totalPrice={totalPrice}
                handleClick={callbacks.handleCloseModal}
                onChangeItemInCart={callbacks.onDeleteItemFromCart}
          />
        </Modal>
      }
    </>
  );
}

export default App;
