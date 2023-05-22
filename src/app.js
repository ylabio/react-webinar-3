import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import CartModal from "./components/cart-modal";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cartList} = store.getState();
  const [modal, setIsOpen] = React.useState(false);

  const callbacks = {
   onDeleteFromCart: useCallback((code) => {
      store.deleteCartItem(code);
   }, [store]),

   onAddToCart: useCallback((code) => {
      store.addCartItem(code);
   }, [store])
  }

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls list={cartList}
        showModal={() => setIsOpen(true)}
        totalPrice={store.totalPrice}/>
      {modal && (
        <CartModal
          title={"Корзина"}
          total={store.totalPrice}
          onClose={() => setIsOpen(false)}
          onDeleteItem={callbacks.onDeleteFromCart}
          list={cartList}
        />
      )}
      <List list={list}
        onAction={callbacks.onAddToCart}
        actionTitle={"Добавить"}/>
    </PageLayout>
  );
}

export default App;
