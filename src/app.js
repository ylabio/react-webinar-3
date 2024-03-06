import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal/index";
import Cart from "./components/cart/index";
import './app.style.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [cartIsOpen, setCartIsOpen] = React.useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),

    onRemoveFromCart: useCallback((item) => {
      store.removeFromCart(item);
    }, [store]),

    onOpenCart: useCallback(() => {
      setCartIsOpen(true);
      document.body.classList.add('scroll');
    }),

    onCloseCart: useCallback(() => {
      setCartIsOpen(false);
      document.body.classList.remove('scroll');
    })
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls callbacks={callbacks} count={cart.itemsCount} totalSumm={cart.totalSumm}/>
      <List type={'Shop'} list={list}
            callback={callbacks.onAddToCart}
            buttonTitle={'Добавить'}/>
        {cartIsOpen && <Modal children={<Cart list={cart.items} callbacks={callbacks} buttonTitle={'Удалить'} totalSumm={cart.totalSumm} />} title={'Закрыть'} callbacks={callbacks}/>}
    </PageLayout>
  );
}

export default App;
