import React, {useCallback, useState} from "react";
import Controls from "./components/controls";
import Head from "./components/head";
import List from "./components/list";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import ModalLayout from "./components/modal-layout";
import Item from "./components/item";


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {list, cartList, cartInfo} = store.getState();

  const callbacks = {
    addToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),

    deleteCartItem: useCallback(
      (code) => {
        store.deleteCartItem(code);
      },
      [store]
    ),
    renderProductItem: useCallback(
      (item) => (
        <Item
          item={item}
          onClick={callbacks.addToCart}
          buttonText="Добавить"
        />
      ),
      []
    ),
  };


  return (
    <>
      <PageLayout>
        <Head title="Магазин"/>
        <Controls cartInfo={cartInfo} setIsModalOpen={setIsModalOpen}/>
        <List list={list} element={callbacks.renderProductItem}/>
      </PageLayout>
      <ModalLayout isModalOpen={isModalOpen}>
        <Cart
          cartInfo={cartInfo}
          cartList={cartList}
          setIsModalOpen={setIsModalOpen}
          DeleteCartItem={callbacks.deleteCartItem}
        />
      </ModalLayout>
    </>
  )
}

export default App;
