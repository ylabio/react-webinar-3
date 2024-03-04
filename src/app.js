import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Button from './components/button';
import { numberWithSpaces } from './utils';
import { calcPrice } from './utils';
import { plural } from './utils';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const modalIsActive = store.getState().modalIsActive;

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

    calcItems: useCallback(() => {
      const goodsCart = store.getState().list.filter(item => item.count)
      const price = calcPrice(goodsCart);
      const count = goodsCart.length;
      const pluralText = plural(count, {
        one: 'товар',
        few: 'товара', 
        many: 'товаров'
      });
      return (count ? `${numberWithSpaces(count)} ${pluralText} / ${numberWithSpaces(price)} ₽` : 'пусто')
    }, [store]),

    toggleModal: useCallback(() => {
      store.toggleModal();
    }, [store]),
  }

  return (
    <>
    <Modal modalIsActive={modalIsActive}
            price={numberWithSpaces(calcPrice(list.filter(item => item.count)))}>
      <Head title='Корзина'>
        <Button onClickFunc={callbacks.toggleModal} text="Закрыть"/>
      </Head>
      
      <List list={list.filter(item => item.count)}
              actionItem={callbacks.onDeleteItem}
              buttonText="Удалить"
              isModal={true}/>
    </Modal>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls calcText={callbacks.calcItems()} text="Перейти" action={callbacks.toggleModal}/>
        <List list={list}
              actionItem={callbacks.onAddItem}
              buttonText="Добавить"/>
      </PageLayout>
    </>
    
  );
}

export default App;
