import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import BasketTool from './components/basket-tool';
import Item from './components/item';
import ItemBasket from './components/item-basket';
import BasketModal from './components/basket-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;

  const [isBasketOpen, setIsBasketOpen] = React.useState(false);

  const callbacks = {
    onRemoveItemFromBasket: useCallback(
      code => {
        store.removeItemFromBasket(code);
      },
      [store],
    ),

    onAddItemToBasket: useCallback(
      item => {
        store.addItemToBasket(item);
      },
      [store],
    ),
  };

  const renders = {
    item(item) {
      return <Item item={item} onAddItemToBasket={callbacks.onAddItemToBasket} />;
    },

    itemBasket(item) {
      return <ItemBasket item={item} onRemoveItemFromBasket={callbacks.onRemoveItemFromBasket} />;
    },
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool
        sum={basket.sum}
        count={basket.count}
        openBasketModal={() => setIsBasketOpen(true)}
      />
      <List list={list} renderItem={renders.item} />
      {isBasketOpen && (
        <BasketModal
          list={basket.items}
          sum={basket.sum}
          count={basket.count}
          closeModalBasket={() => setIsBasketOpen(false)}
          renderItem={renders.itemBasket}
        />
      )}
    </PageLayout>
  );
}

export default App;
