import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const listItems = store.getState().list;
  const basketItems = store.getState().basket;
  const totalPrice = store.getState().total[1]?.totalPrice || 0;
  const [active, setActive] = useState(false);

  const callbacks = {

    onAddProductInBasket: useCallback((code) => {
      const currentBasketItems = store.getState().basket;
      const hasItem = currentBasketItems.some(item => item.code === code);
      if(hasItem) {
        store.changeCount(code)
      }else{
        store.addProductInBasket(code)
      }
      store.totalCount();
      }, [store]),

    onDeleteItem: useCallback((code) => {
        store.deleteItem(code);
        store.totalCount();
    }, [store])
  }

  return (
    <>
      <PageLayout>
        <Head title="Maгазин" />
        <Controls 
          basket={basketItems}
          setActive={setActive} 
          active={active}
          totalPrice={totalPrice} />
        <List
          active={active}
          list={listItems}
          title="Добавить"
          onclick={callbacks.onAddProductInBasket}
        />
      </PageLayout>
      <Modal active={active}>
        <Basket 
          setActive={setActive} 
          active={active} 
          basket={basketItems}
          onDeleteItem={callbacks.onDeleteItem}
          totalPrice={totalPrice} />
      </Modal>
    </>
  )
}

export default App
