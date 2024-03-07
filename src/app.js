import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const {list, orders, totalCount, totalPrice} = store.getState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),

    onCloseModal: useCallback(() => {
      setIsModalOpen(false);
      document.body.style.overflow = 'uncet';
    }, []),

    onOpenCart: useCallback(() => {
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls countItem={totalCount} sumItems={totalPrice} onOpen={callbacks.onOpenCart}/>
      <List list={list} onAddCart={callbacks.onAddToCart} />
      {isModalOpen &&
        <Modal onCloseModal={callbacks.onCloseModal} children={
          // <p>hi hi hhiih hih</p>
          <Cart
            items={orders}
            totalSum={totalPrice}
            onDeleteItem={callbacks.onDeleteItem}
          />
        } />
      }
    </PageLayout>
  );
}

export default App;
