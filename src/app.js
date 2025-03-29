import React, { useCallback, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Popup from './components/popup';
import TotalItems from './components/totalItems';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { list, cart, uniqCount, totalPrice } = store.getState();

  const callbacks = {
    onAdd: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),
    delete: useCallback(
      code => {
        store.deleteItems(code);
      },
      [store],
    ),
    open: useCallback(() => {
      setIsOpen(true);
    }, [isOpen]),
    close: useCallback(() => {
      setIsOpen(false);
    }, [isOpen]),
  };

  useEffect(() => {
    if (cart.length === 0) {
      callbacks.close();
    }
  }, [cart]);

  return (
    <>
      <Head title="Магазин" />
      <PageLayout>
        <Controls price={totalPrice} count={uniqCount} open={callbacks.open} />
        <List list={list} callback={callbacks.onAdd} modal={false} />
      </PageLayout>

      <Popup isOpen={isOpen} onClose={callbacks.close}>
        <List list={cart} callback={callbacks.delete} modal={true} />
        <TotalItems totalPrice={totalPrice} />
      </Popup>
    </>
  );
}

export default App;
