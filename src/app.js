import React, { useCallback,  useRef } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import  CartIcon  from 'assets/cart-icon.svg'
import { formatPrice, plural } from './utils';
import CartModal from './components/cart-modal';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const uniqItemsinCart = store.getState().uniqItems;
  const finalPrice =store.getState().finalPrice;

  const formatedFinalPrice = formatPrice(finalPrice);

  const modalRef = useRef();
  
  const callbacks = {
    onAddItemtoCart: useCallback(
      code => {
        store.addItemtoCart(code);
      },
      [store],
    ),
    onDeleteItemfromCart: useCallback(
      code => {
        store.deleteItemfromCart(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <CartModal  finalPrice={finalPrice} onDeleteItemfromCart={callbacks.onDeleteItemfromCart} list={list} ref={modalRef}/>
      <Head title="Магазин" />
      <Controls handleClick={()=>{modalRef.current.open()}}  styles="Controls-cart" 
        title={uniqItemsinCart > 0  ? `${uniqItemsinCart} ${plural(uniqItemsinCart, { one: 'товар', few: 'товара',many: 'товаров',})} / ${formatedFinalPrice}` : 'Пусто'}>
        <CartIcon/></Controls>
      <List
        list={list}
        onAddItemtoCart={callbacks.onAddItemtoCart}
      />
    </PageLayout>
  );
}

export default App;
