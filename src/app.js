import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import CartItem from './components/cart-item';
import CartTotal from './components/cart-total';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const state = store.getState();

  const callbacks = {
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

    onDeleteFromCartItem: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),
  }

  const renderItemsList = useCallback((item) => {
    return <Item item={item} onAddToCart={callbacks.onAddToCartItem} />;
  }, [callbacks.onAddToCartItem]);

  const renderCartList = useCallback((item) => {
    return <CartItem item={item} onDelete={callbacks.onDeleteFromCartItem} />
  }, [callbacks.onDeleteFromCartItem]);

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls
          onCartOpen={callbacks.onOpenModal}
          totalQuantity={state.cartList?.length}
          totalPrice={state.totalCartPrice}
        />
        <List
          list={state.list}
          renderItem={(item) => renderItemsList(item)}
        />
      </PageLayout>
      {
        state.modal &&
        <ModalLayout
          title='Корзина'
          closeModal={callbacks.onCloseModal}
        >{
          <>
            { state.cartList ?
                state.cartList.length !== 0 ?
                <List list={state.cartList} renderItem={(item) => renderCartList(item)} /> :
                <div>Нет товаров в корзине</div> :
              <div>Нет товаров в корзине</div> }
            <CartTotal value={ state.totalCartPrice ? state.totalCartPrice : 0 } />
          </>
        }</ModalLayout>
      }
    </>
  );
}

export default App;
