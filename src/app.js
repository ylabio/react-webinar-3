import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cart, totalCart} = store.getState();

  const [open, setOpen] = useState(false);

  const openWindow = () => {
    setOpen(!open);
  };

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      {open && (
        <Modal>
          <Head className="Modal__header" title="Корзина">
            <div className="Modal__header-close">
              <button onClick={openWindow}>Закрыть</button>
            </div>
          </Head>
          <Cart cart={cart} totalCart={totalCart} action={callbacks.onDeleteItem}/>
        </Modal>
      )}
      <Controls 
        cart={cart} 
        totalCart={totalCart} 
        action={callbacks.onDeleteItem} 
        openWindow={openWindow}
      />
      <List list={list} action={callbacks.onAddItem} buttonText='Добавить'/>
    </PageLayout>
  );
}

export default App;
