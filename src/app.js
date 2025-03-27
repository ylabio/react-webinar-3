import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Modal from './components/modal';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),

  };


  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls openCart={toggleModal} cart={cart} />
      <List
        list={list}
        onAdd={callbacks.onAddItem}
      />
      {modal && (
        <Modal onCLick={toggleModal}>
        <Cart cart={cart} onDelete={callbacks.onDeleteItem}/>
        </Modal>
      )}

    </PageLayout>
  );
}

export default App;
