import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const state = store.getState();

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

    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),

    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),

    onAddToCartItem: useCallback((code) => {
      store.addToCart(code);
    }, [store]),
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        {/* <Controls onAdd={callbacks.onAddItem}/> */}
        <Controls
          onCartOpen={callbacks.onOpenModal}
          totalQuantity={state.cartList?.length}
          totalPrice={state.totalCartPrice}
        />
        <List list={state.list}
              onDeleteItem={callbacks.onDeleteItem}
              onSelectItem={callbacks.onSelectItem}
              onAddToCartItem={callbacks.onAddToCartItem}/>
      </PageLayout>
      {
        state.modal ?
        <ModalLayout
          title='Корзина'
          closeModal={callbacks.onCloseModal}
        /> :
        ''
      }
    </>
  );
}

export default App;
