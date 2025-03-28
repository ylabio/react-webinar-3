import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Close from './components/close';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import ModalHead from './components/modal-head';
import ModalList from './components/modal-list';
import ModalResult from './components/modal-result';
import { plural } from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const newlist = store.getState().newlist;

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

    onAddItem: useCallback(
      item => {
        store.addItem(item);
      },
      [store],
    ),

    onHandleClose: useCallback(() => {
      store.handleClose();
    }, []),

    onHandleOpen: useCallback(() => {
      store.handleOpen();
    }, []),
  };

  return (
    <PageLayout>
      <Modal className={store.state.isVisible ? 'Modal Modal-visibile' : 'Modal'}>
        <Close onClose={callbacks.onHandleClose} />
        <ModalHead title="Корзина" />
        <ModalList
          newlist={newlist}
          onDeleteItem={callbacks.onDeleteItem}
        />
        <ModalResult allPrise={store.getTotalPrice()} />
      </Modal>
      <Head title="Магазин" />
      <Controls onOpen={callbacks.onHandleOpen} text={
        newlist.length > 0
          ? `${newlist.length} ${plural(newlist.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${store.getTotalPrice()} ₽`
          : 'Пусто'
      } />
      <List
        list={list}
        onAdd={callbacks.onAddItem}
      />
    </PageLayout>
  );
}

export default App;
