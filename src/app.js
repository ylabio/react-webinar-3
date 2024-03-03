import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [cartProducts, setCartProducts] = useState([]);
  const [cartSum, setCartSum] = useState(0);

  const list = store.getState().list;

  const callbacks = {
    onAddToCart: useCallback((code) => {
      const product = store.getState().list.find(item => item.code === code);
      setCartProducts((prev) => {
        const existingProductIndex = prev.findIndex((item) => item.code === product.code);

        if (existingProductIndex !== -1) {
          const updatedProducts = [...prev];
          updatedProducts[existingProductIndex] = {
            ...updatedProducts[existingProductIndex],
            count: updatedProducts[existingProductIndex].count + 1,
          };
          return updatedProducts;
        }

        return [...prev, { ...product, count: 1 }];
      });
      setCartSum(prev => prev + product.price);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onAdd={callbacks.onAddItem}
                cartProducts={cartProducts}
                cartSum={cartSum}/>
      <List list={list}
            onAddToCart={callbacks.onAddToCart}
            onSelectItem={callbacks.onSelectItem}/>
    </PageLayout>
  );
}

export default App;
