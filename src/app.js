import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalLayout from './components/modal-layout';
import TotalBlock from './components/total-block'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const {carts, list} = store.getState();

  const totalCount = carts.length;
  const totalPrice = carts.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);


  const callbacks = {
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store]),

    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onShowCart: useCallback(() => {
      setIsCartOpen(true)
    }, []),

    onCloseCart: useCallback(() => {
      setIsCartOpen(false)
    }, [])
  }

  return (
    <PageLayout>
      <Head title={'Магазин'}/>
      <Controls totalPrice={totalPrice} totalCount={totalCount} onShowCart={callbacks.onShowCart}/>
      <List 
        list={list}
        actionBtnName={'Добавить'}
        onAction={callbacks.onAddToCart}
      />

      {isCartOpen && 
        <ModalLayout onClose={callbacks.onCloseCart}>
          <Head title={'Корзина'} isCartOpen={isCartOpen} onCloseCart={callbacks.onCloseCart}/>
          <List 
            style={{marginTop: '70px'}} 
            list={carts}
            actionBtnName={'Удалить'}
            onAction={callbacks.onDeleteFromCart}
            showCount={true}
          />
          <TotalBlock totalPrice={totalPrice}/>
        </ModalLayout>
      }

    </PageLayout>
  );
}

export default App;
