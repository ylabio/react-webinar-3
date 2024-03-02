import React, {useCallback} from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import Controls from './components/controls';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cart} = store.getState();
  const itemsInCart = list.filter(({code}) => cart[code]);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls>
        <Cart cart={cart}
              items={itemsInCart}
              onRemove={callbacks.onRemoveFromCart} />
      </Controls>
      <List list={list}
            onAdd={callbacks.onAddToCart}/>
    </PageLayout>
  );
}

export default App;
