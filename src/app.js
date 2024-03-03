import React, { useState, useCallback } from "react";
import List from "./components/list";
import Head from "./components/head";
import Cart from "./components/cart";
import PageLayout from "./components/page-layout";
import CartMenu from "./components/cart-menu";
import { monefy } from './utils'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cartIsShow, setCartIsShow] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);
  
  const list = store.getState().list.map((product) => {
    return {
      ...product,
      count: 0,
      content: [monefy(product.price)],
    };
  });
  
  const callbacks = {
    onCartOpen: useCallback(() => setCartIsShow(true)),
    onCartClose: useCallback(() => setCartIsShow(false)),
    onAddToCart: useCallback((product) => addToCart(product)),
    onDeleteFromCart: useCallback((product) => deleteFromCart(product.code)),
  };

  const addToCart = (product) => {
    const index = productsInCart.findIndex((item) => {
      if (item.code === product.code) {
        return true;
      } else {
        return false;
      }
    });

    if (index !== -1) {
      setProductsInCart((oldCart) => {
        const newCart = [...oldCart];

        const newProduct = newCart[index];

        newProduct.count += 1;
        newProduct.content = [monefy(newProduct.price), newProduct.count];

        return newCart;
      });
    } else {
      setProductsInCart((oldCart) => {
        const newProduct = {...product};
        
        newProduct.count = 1;
        newProduct.content = [monefy(newProduct.price), newProduct.count];
        
        return [...oldCart, newProduct];
      });
    }
  };

  const deleteFromCart = (code) => {
    setProductsInCart((oldCart) => {
      return oldCart.filter((product) => {
        if (product.code === code) {
          return false;
        }

        return true;
      })
    } )
  }

  const addToCartBtn = {
    title: "Добавить",
    onClick: callbacks.onAddToCart,
  };

  const deleteFromCartBtn = {
    title: "Удалить",
    onClick: callbacks.onDeleteFromCart,
  }

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <CartMenu cartList={productsInCart} onCartOpen={callbacks.onCartOpen} />
        <List list={list} itemsBtn={addToCartBtn} />
      </PageLayout>
      <Cart
        list={productsInCart}
        itemBtn={deleteFromCartBtn}
        isShow={cartIsShow}
        onClose={callbacks.onCartClose}
      />
    </>
  );
}

export default App;
