import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart/cart';
import CartSummary from './components/cart/cartSummary/cartSummary';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const isModalOpen = store.getState().isModalOpen
  const list = store.getState().list;
  const selectedItems = store.getState().selectedItems; 
  const countPrice = store.getState().countPrice;
  const callbacks = {
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
          <Head title='Магазин' />  
          <Controls onAction={callbacks.onToggleCart} title='Перейти'>
              <CartSummary count={selectedItems.length} totalPrice={countPrice} />
          </Controls>
          <List titleButton={'Добавить'} list={list}
              onСlickItem={callbacks.onAddItem}/>
          <Cart store={store} />
   
    </PageLayout>
  );
}

export default App;
