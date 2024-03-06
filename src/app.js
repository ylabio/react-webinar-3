import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import CartInfo from './components/cart-info';
import Modal from './components/modal';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [modalIsOpened, setModalIsOpened] = useState(false)

  const storeItems = store.getState().list;
  const cartItems = store.getState().cart;
  const cartTotal = store.getState().cartTotal

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
    onRemoveItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store]),
    toggleModalVisibility: () => {
      setModalIsOpened(!modalIsOpened)
    }
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenCart={callbacks.toggleModalVisibility}>
        <CartInfo cartTotal={cartTotal}/>
      </Controls>
      <List
        itemsList={storeItems}
        itemButtonsAction={callbacks.onAddItemToCart}
        itemButtonsName={'Добавить'}
        renderListItem={(props) => <Item {...props} />}
      />
      <Modal modalIsOpened={modalIsOpened} toggleModal={callbacks.toggleModalVisibility}>
        <Cart
          cartTotal={cartTotal}
          itemButtonsAction={callbacks.onRemoveItemFromCart}
          itemsList={cartItems}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
