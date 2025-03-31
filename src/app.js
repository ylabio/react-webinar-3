import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ListItem from './components/list-item';
import Product from './components/product';
import Dialog from './components/dialog';
import CartButton from './components/cart-button';
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalCartPrice = store.getState().totalCartPrice;
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);

  const callbacks = {
    onAddProductToCart: useCallback(
      product => {
        store.addProductToCart(product);
      },
      [store],
    ),

    onDeleteProductFromCart: useCallback(
      code => {
        store.deleteProductFromCart(code);
      },
      [store],
    ),

    onCartDialogOpen: () => setIsCartDialogOpen(true),

    onCartDialogClose: () => setIsCartDialogOpen(false),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls>
        <CartButton totalCartPrice={totalCartPrice} cart={cart} onClick={callbacks.onCartDialogOpen} />
      </Controls>
      <List>
        {list.map(product => (
          <ListItem key={product.code}>
            <Product product={product} onAddToCart={callbacks.onAddProductToCart} />
          </ListItem>
        ))}
      </List>
      <Dialog title="Корзина" open={isCartDialogOpen} onClose={callbacks.onCartDialogClose}>
        <Cart totalCartPrice={totalCartPrice} cart={cart} onDeleteProductFromCart={callbacks.onDeleteProductFromCart} />
      </Dialog>
    </PageLayout>
  );
}

export default App;
