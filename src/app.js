import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import ItemCart from "./components/itemCart";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const products = store.getState().list;
  const cart = store.getState().cart;
  const totalPriceCart = store.getState().totalPriceCart;
  const countItemCart = store.getState().countItemCart;

  const [isOpenModal, setIsOpenModal] = useState(false)

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddToCart: useCallback((item) => {
      store.addToCart(item)
    }, [store]),

    onOpenModal: () => {
      setIsOpenModal(!isOpenModal);
    },
  }

  return (
  <>
    <PageLayout>
      <Head title='Магазин'/>
      <Controls
        countItemCart={countItemCart}
        totalPriceCart={totalPriceCart}
        onOpenModal={callbacks.onOpenModal}/>
      <List list={products}>
        <Item onAddToCart={callbacks.onAddToCart}/>
      </List>
    </PageLayout>
    {
      isOpenModal &&
        <Modal cart={cart}
          totalPriceCart={totalPriceCart}
          onDeleteItem={callbacks.onDeleteItem}
          onOpenModal={callbacks.onOpenModal}
        />
    }
  </>
  );
}

export default App;
