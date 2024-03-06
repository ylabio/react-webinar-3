import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import { countTotalPrice, renderCartInfo } from './utils';
import { Counter } from './components/controls/counter';
import ShoppingItem from './components/shopping-item';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { list, shoppingList } = store.getState();

  const totalPrice = countTotalPrice(shoppingList).toLocaleString();
  const cartInfo = renderCartInfo(shoppingList);

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
      <Head title='Магазин' />
      <Controls onClose={() => setIsMenuOpen(!isMenuOpen)} cartInfo={cartInfo} />
      <List list={list} onClick={callbacks.onAddItem} >
        <Item />
      </List>
      <Modal isOpen={isMenuOpen} title={"Корзина"} onClose={() => setIsMenuOpen(false)}>
        <List onClick={callbacks.onDeleteItem} list={shoppingList}>
          <ShoppingItem />
        </List>
        <Counter totalPrice={totalPrice} />
      </Modal>
    </PageLayout>
  );
}

export default App;
