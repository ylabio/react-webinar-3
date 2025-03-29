import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import CartList from './components/cart';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, totalPrice } = store.getState();

  const [isModalOpen, setIsModalOpen] = useState(false);

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

    onRenderProducts: useCallback(
      item => (
        <li key={item.code}>
          <Item item={item} onAddItem={callbacks.onAddItem} />
        </li>
      ),
      [],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />

      <Controls
        totalUniqueItems={cart.length}
        totalPrice={totalPrice}
        onOpenModal={setIsModalOpen}
      />

      <Modal active={isModalOpen} onClose={setIsModalOpen}>
        <CartList
          onClose={setIsModalOpen}
          onDeleteItem={callbacks.onDeleteItem}
          cart={cart}
          sumPrice={totalPrice}
          list={list}
        />
      </Modal>

      <List list={list} renderItem={callbacks.onRenderProducts} />
    </PageLayout>
  );
}

export default App;
