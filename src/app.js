import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal/index";
import Cart from "./components/Cart/index";
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


  function getItemsInCart(){
    const itemsInCart = list.filter(item => cart.items.includes(item));
    return itemsInCart;
  }

  function getTotalSumm(){
    let totalSumm = 0;
    if(cart) {
      totalSumm = cart.items.reduce((summ, item) => +item.price + summ, 0);
    }

    return totalSumm;
  }


  const callbacks = {
    // onDeleteItem: useCallback((code) => {
    //   store.deleteItem(code);
    // }, [store]),

    onAddToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),

    onRemoveFromCart: useCallback((item) => {
      store.removeFromCart(item);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store])

    onOpenCart: useCallback(() => {
      setCartIsOpen(true);
    }),

    onCloseCart: useCallback(() => {
      setCartIsOpen(false);
    })
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls callbacks={callbacks} count={getItemsInCart().length} totalSumm={getTotalSumm()}/>
      <List type={'Shop'} list={list}
            callback={callbacks.onAddToCart}
            onSelectItem={callbacks.onSelectItem}
            buttonTitle={'Добавить'}/>
        {/* {cartIsOpen && <Modal list={cart.items} callback={callbacks.onRemoveFromCart} buttonTitle={'Удалить'}/>} */}
        {cartIsOpen && <Modal children={<Cart list={cart.items} callbacks={callbacks} buttonTitle={'Удалить'} totalSumm={getTotalSumm()} />}/>}
    </PageLayout>
  );
}

export default App;
