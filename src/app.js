import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Item from "./components/item";
import {generateCode, getCurrency, plural} from "./utils";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [basket, setBasket] = useState({ itemsTotal: 0, itemPrice:0});
  const [isOpened, setIsOpened] = useState(false);
  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),
    onToggleModal: useCallback(() => {
      setIsOpened(prev => !prev);
    }, []),
      onCloseModal: useCallback((e) => {
          if(e.currentTarget === e.target){
              setIsOpened(false);
          }
      }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls openModal={callbacks.onToggleModal}>
          <div>

              В корзине: <b>
              {
                  basket.itemsTotal ?
              Object.keys(basket).length - 2 + ' ' + plural(Object.keys(basket).length - 2, {one: 'товар', few: 'товара', many: 'товаров', other: 'товара'}, 'ru-RU') + ' / ' + getCurrency(basket.itemPrice, 'ru-Ru', 'RUB') :
                      'Пусто'
              }
          </b>
          </div>
          <button onClick={callbacks.onToggleModal}>Перейти</button>
      </Controls>
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}
            setBasket={setBasket}
      />
          <Modal isOpened={isOpened} setIsOpened={callbacks.onCloseModal}>
            <Head title="Корзина">
              <button onClick={callbacks.onToggleModal} >Закрыть</button>
            </Head>
              <div className='Modal-content'>
            {
              (!!basket.itemsTotal) ? <List list = {Object.keys(basket)} setBasket={setBasket} isModalOpen={isOpened} basket={basket}/>: <div className='Modal-empty'>Здесь пусто</div>
            }
              </div>

          </Modal>

    </PageLayout>
  );
}

export default App;
