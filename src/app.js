import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const isModalOpen = store.getState().isModalOpen
  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

      onAddItem: useCallback((code) => {
          store.addItem(code);
    }, [store]),

    onToggleCart: useCallback(() => {
        if (isModalOpen) {
            store.closeModal();
        } else {
            store.openModal();
        }
    }, [isModalOpen, store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onAction={callbacks.onToggleCart} title='Перейти'/>
          <List titleButton={'Добавить'} list={list}
              onСlickItem={callbacks.onAddItem}/>
          <Modal isOpen={isModalOpen} onClose={callbacks.onToggleCart}>
              <Head title='Корзина' />
              <List titleButton={'Удалить'} list={list.filter(item => item.hasOwnProperty('count'))}
                  onСlickItem={callbacks.onDeleteItem}
              />
            
          </Modal>
   
    </PageLayout>
  );
}

export default App;
