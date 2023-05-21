import React, {useCallback, useState} from 'react';
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
  const [modalActive, setModalActive] = useState(false)
  const list = store.getState().list;
  const basket = store.getState().basket;
  const calculatePrice = store.getState().calculatePrice;
  const totalGoods = store.getState().totalGoods;

  const callbacks = {
    onDeleteItem: useCallback((code, quantity) => {
      store.deleteItem(code,quantity);
    }, [store]),
    onAddItem: useCallback((code, title, price) => {
      store.addItemToBasket(code, title, price);
    }, [store]),
  }

  return (<>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls calculatePrice={calculatePrice}
                  setActive={setModalActive}
                  totalGoods={totalGoods}
        />
        <List list={list}
              onAddItem={callbacks.onAddItem}
        />

      </PageLayout>
      <Modal active={modalActive}
             setActive={setModalActive}>
        <Head title='Корзина'
              active={modalActive}
              setActive={setModalActive}/>
        <Basket basket={basket}
                onDeleteItem={callbacks.onDeleteItem}
                active={modalActive}
                calculatePrice={calculatePrice}
        />
      </Modal>
  </>

  );
}

export default App;
