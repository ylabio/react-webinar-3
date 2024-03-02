import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModalActive, setIsModalActive] = useState(false);

  const data = {
    list: store.getState().list,
    cart: store.getState().cart,
  }

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={data.cart}
                onCartModalOpen={setIsModalActive}
                />
      <List list={data.list}
            onClick={callbacks.onAddItem}
            buttonText='Добавить'/>
      {isModalActive && <CartModal 
        setIsModalActive={setIsModalActive} 
        data={data.cart} 
        onClick={callbacks.onDeleteItem}
      />}
    </PageLayout>
  );
}

export default App;
