import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ProductItem from './components/product-item';
import CartModal from './components/cart-modal';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = store.getState().list;
  const cart = store.getState().cart;
  const cartTotalCount = store.getState().cartTotalCount;
  const cartTotalPrice = store.getState().cartTotalPrice;

  const cartActions = {
    add: useCallback(code => store.addItemToCart(code), [store]),
    remove: useCallback(code => store.removeItemFromCart(code), [store]),
    toggleModal: useCallback(() => setIsModalOpen(prev => !prev), []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cartTotalCount={cartTotalCount}
        cartTotalPrice={cartTotalPrice}
        onCartClick={cartActions.toggleModal}
      />
      <List
        list={products}
        renderItem={item => <ProductItem item={item} onAddToCart={cartActions.add} />}
      />
      <CartModal
        isOpen={isModalOpen}
        onClose={cartActions.toggleModal}
        cart={cart}
        total={cartTotalPrice}
        onDelete={cartActions.remove}
      />
    </PageLayout>
  );
}

export default App;
