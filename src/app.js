import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Item from "./components/item"
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';
import ModalLayout from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [activeModal, setActiveModal] = useState(false);

  const list = store.getState().list;
  const summaryPrice = store.getState().summaryPrice;
  const quantityProducts = store.getState().quantityProducts;

  const callbacks = {
    deleteFromBasket: useCallback((code) => {
      store.deleteFromBasket(code);
      store.calculateSummary();
    }, [store]),

    addToBasket: useCallback((code) => {
      store.addToBasket(code);
      store.calculateSummary();
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls openModal={setActiveModal} quantityProducts={quantityProducts}  summaryPrice={summaryPrice}/>
      <List>
        {list.map(item =>
          <div key={item.code} className='List-item'>
            <Item item={item} addToBasket={callbacks.addToBasket}/>
          </div>
        )}
      </List>
      <ModalLayout title="Корзина" active={activeModal} closeModal={setActiveModal}>
        <Basket listInBasket={list} deleteFromBasket={callbacks.deleteFromBasket} summaryPrice={summaryPrice}/>
      </ModalLayout>
    </PageLayout>
  );
}

export default App;
