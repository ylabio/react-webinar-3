import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Item from './components/item';
import Modal from './components/modal';
import Summary from './components/summary';
import Empty from './components/empty';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModal, setIsModal] = useState(false);

  const list = store.getState().list;
  const {chosenItems, count, price} = store.getChosen();


  const callbacks = {
    onCartRemoveItem: useCallback((code) => {
      store.removeChosenItem(code);
    }, [store]),

    onChooseItem: useCallback((code) => {
      store.chooseItem(code);
    }, [store]),

    onModalClose: useCallback(() => {
      setIsModal(false)
    }, [setIsModal]),

    onOpen: useCallback(() => {
      setIsModal(true)
    }, [setIsModal])
  }
  
  const listItem = useCallback(item => <Item item={item} onClick={callbacks.onChooseItem} actionName='Добавить'/>, []);
  const modalListItem = useCallback(item => <Item item={item} onClick={callbacks.onCartRemoveItem} actionName='Удалить'/>, []);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls>
        <Cart count={count} price={price} onClick={callbacks.onOpen}/>
      </Controls>
      <List list={list} childElem={listItem}/>
      {isModal &&
      <Modal title='Корзина' onClose={callbacks.onModalClose}>
        {!count ? 
         <Empty/>: 
        <>
          <List list={(Object.values(chosenItems))} childElem={modalListItem}/>
          <Summary price={price} />
        </>}
      </Modal>}
    </PageLayout>
  );
}

export default App;
