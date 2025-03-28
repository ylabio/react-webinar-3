import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, total } = store.getState();

  const [modalOpened, setModalOpened] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    openModal: useCallback(
      () => {
        setModalOpened(true);
      },
      [modalOpened],
    ),

    closeModal: useCallback(
      () => {
        setModalOpened(false);
      },
      [modalOpened],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        total={total}
        onTotalClick={callbacks.openModal}
      />
      <List
        list={list}
        onSelectItem={callbacks.onSelectItem}
      />
      <Modal
        opened={modalOpened}
        close={callbacks.closeModal}
      >
        <Cart
          title="Корзина"
          cart={cart}
          total={total}
          onDeleteItem={callbacks.onDeleteItem}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
