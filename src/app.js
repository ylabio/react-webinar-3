import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { Cart } from './components/cart';
import ModalLayout from './components/modal-layout';
import { CartContent } from './components/cart-content';
import ProductItem from './components/product-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalShown, setIsModalShown] = useState(false);

  const { list, cart, cartTotalPrice, cartItemsCount } = store.getState();

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onToggleModal: useCallback(() => {
      setIsModalShown(prev => !prev);
    }, []),
  };

  const renderProductItem = useCallback(
    item => (
      <ProductItem
        code={item.code}
        title={item.title}
        price={item.price}
        onAdd={callbacks.onAddItem}
      />
    ),
    [callbacks.onAddItem]
  );

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart
        totalPrice={cartTotalPrice}
        itemsCount={cartItemsCount}
        onShowModal={callbacks.onToggleModal}
      />
      <List items={list} renderItem={renderProductItem} />
      {isModalShown && (
        <ModalLayout>
          <CartContent
            cart={cart}
            totalPrice={cartTotalPrice}
            onShowModal={callbacks.onToggleModal}
            onDeleteItem={callbacks.onDeleteItem}
          />
        </ModalLayout>
      )}
    </PageLayout>
  );
}

export default App;
