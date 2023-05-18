import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

function App({ store }) {
  const list = store.getState().list;
  const [modal, setModal] = useState(false);
  const [countPrice, setCountPrice] = useState(0);
  const [products, setProducts] = useState([]);

  function addProductToCart(product) {
    const isProductInCart = products.some((item) => item.title === product.title);

    if (!isProductInCart) {
      setProducts([...products, { ...product, countValue: 1 }]);
      setCountPrice(countPrice + product.price);
    } else {
      const updatedProducts = products.map((item) => {
        if (item.title === product.title) {
          return { ...item, countValue: item.countValue + 1 };
        }
        return item;
      });

      setProducts(updatedProducts);
      setCountPrice(countPrice + product.price);
    }
  }

  function removeProductFromCart(product) {
    setProducts(products.filter((item) => item.code !== product.code));
    products.forEach((item) => {
      if (item.title === product.title) {
        setCountPrice(countPrice - product.price * item.countValue);
      }
    });
  }

  const handleDeleteItem = useCallback(
    (code) => {
      store.deleteItem(code);
    },
    [store],
  );

  const handleSelectItem = useCallback(
    (code) => {
      store.selectItem(code);
    },
    [store],
  );

  const handleAddItem = useCallback(() => {
    store.addItem();
  }, [store]);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        modal={modal}
        setModal={setModal}
        onAdd={handleAddItem}
        countPrice={countPrice}
        setCountPrice={setCountPrice}
        products={products}
        removeProduct={removeProductFromCart}
      />
      <List
        list={list}
        addProduct={addProductToCart}
        onDeleteItem={handleDeleteItem}
        onSelectItem={handleSelectItem}
      />
    </PageLayout>
  );
}

export default App;
