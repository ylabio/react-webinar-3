import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalLayout from "./components/modal-layout";
import Item from "./components/item";
import BasketItem from "./components/basket-item";
import BasketSum from "./components/basket-sum";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const state = store.getState();

  const callbacks = {
    addBasket: useCallback((code) => {
      store.addBasketItem(code);
    }, [store]),

    removeBasket: useCallback((code) => {
      store.removeItemBasket(code);
    }, [store]),

    openBasketModal: useCallback(() => {
      store.openModal('modalBasket');
    }, [store]),

    closeModal: useCallback(() => {
      store.closeModal();
    }, [store])
  }

  const rendersList = useCallback((item, isBasketItem) => {
    if (isBasketItem) {
      return <BasketItem item={item} onRemove={callbacks.removeBasket}/>;
    } else {
      return <Item item={item} onAdd={callbacks.addBasket}/>;
    }
  }, [callbacks.addBasket, callbacks.removeBasket]);

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls onAdd={callbacks.openBasketModal} sum={state.basketItems.sum} count={state.basketItems.count}/>
        <List list={state.list} viewItem={(item) => rendersList(item, false)}/>
      </PageLayout>
      {
        state.modal === 'modalBasket' &&
        <ModalLayout title={'Корзина'} closeModal={callbacks.closeModal}>
          <List list={state.basketItems.list} viewItem={(item) => rendersList(item, true)}/>
          <BasketSum total={state.basketItems.sum}/>
        </ModalLayout>
      }
    </>
  );
}

export default App;
