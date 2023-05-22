import React, {useCallback} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalCart from "./components/modal-cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const {list, 	cartList, cartPriceTotal, cartCountTotal} = store.getState();

  const callbacks = {
    deleteItemToCart: useCallback((code) => {
      store.deleteItemToCart(code);
    }, [store]),

    addItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <ModalCart onDeleteItem={callbacks.deleteItemToCart}
                 list={cartList}
                 totalPrice={cartPriceTotal}
                 totalCount={cartCountTotal}/>
      <List list={list}
            listFunction={callbacks.addItemToCart} listTitle={'Добавить'}/>
    </PageLayout>
  );
}

export default App;
