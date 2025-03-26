import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartWidget from './components/cartWidget';
import Main from './components/main/main';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Main>
        <CartWidget amount={0} quantity={2} onClick={() => alert('Корзина')} />
        <List list={list} onClick={callbacks.onAddItem} buttonText="Добавить" quantity={12} />
      </Main>
    </PageLayout>
  );
}

export default App;
