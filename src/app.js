import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import Close from './components/close';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import ModalHead from './components/modalHead';
import ModalList from './components/modalList';
import ModalResult from './components/modalResult'

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

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItem(code);

      }, [store]
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
          list={list}
          onDeleteItem={callbacks.onDeleteItem}
          onSelectItem={callbacks.onSelectItem}
        />
        <ModalResult title="223 p." />
      </Modal>
      <Head title="Магазин" />
      <Controls onOpen={callbacks.onHandleOpen} text="Пусто" />
      <List
        list={list}
        onAdd={callbacks.onAddItem}
        onSelectItem={callbacks.onSelectItem}
      />
    </PageLayout>
  );
}


export default App;
