import React, { useCallback, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const [isOpened, setIsOpened] = React.useState(false);
  const [storeState, setStoreState] = React.useState(() => ({
    order: store.getOrder(),
    total: store.getTotal(store.getOrder().items),
  }));

  useEffect(() => {
    const updateFromStore = () => {
      const newOrder = store.getOrder();
      setStoreState({
        order: newOrder,
        total: store.getTotal(newOrder.items),
      });
    };
    updateFromStore();
    const unsubscribe = store.subscribe(updateFromStore);
    return unsubscribe;
  }, [store]);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
    onAddItem: useCallback(
      item => {
        store.addItem(item);
      },
      [store],
    ),
  };

  const onOpenBasket = () => {
    setIsOpened(!isOpened);
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls order={storeState.order} onOpenBasket={onOpenBasket} />
      <List list={list} onAddItem={callbacks.onAddItem} />
      {isOpened && (
        <Modal
          total={storeState.total}
          order={storeState.order}
          onDeleteItem={callbacks.onDeleteItem}
          onClose={() => setIsOpened(false)}
        />
      )}
    </PageLayout>
  );
}

export default App;
