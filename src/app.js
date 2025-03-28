// app.js
import React from 'react';
import Head from './components/head';
import Controls from './components/controls';
import List from './components/list';
import PageLayout from './components/page-layout';
import CartModal from './components/cart_modal';

function App({ store }) {
  const { list, cart, isModalOpen } = store.getState();

  return (
    <PageLayout>
      {/* Заголовок страницы */}
      <Head title="Магазин" />

      {/* Компонент Controls, в котором есть кнопка "openCart" */}
      <Controls
        openCart={() => store.openCart()}
        cart={store.getState().cart}
      />

      {/* Список товаров */}
      <List
        list={list}
        onDeleteItem={(code) => store.deleteItem(code)}
        onAddToCart={(code) => store.addItemToCart(code)}
      />

      {/* Условно рендерим модальное окно, если isModalOpen === true */}
      {isModalOpen && (
        <CartModal
          cart={store.getState().cart}
          onClose={() => store.closeCart()}
          onDeleteItem={(code) => store.deleteItem(code)}
        />
      )}
    </PageLayout>
  );
}

export default App;
