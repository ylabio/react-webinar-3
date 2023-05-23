import React, { useCallback, useState, useRef, useEffect } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
    const list = store.getState().list;
    const cart = store.getState().cart;
    const [openCart, setOpenCart] = useState(false);
    // Клик вне элемента корзины
    const rootRef = useRef(null);
    useEffect(() => {
      const handleClickOutSide = (e) => {
        if (openCart && rootRef.current && !rootRef.current.contains(e.target)) {
          setOpenCart(false)
        } 
      }
    document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
    }, [openCart])
    const callbacks = {
        addItemBasket: useCallback(
            (code) => {
                store.addItemToCart(code);
            },
            [store]
        ),
        deleteItemBasket: useCallback(
            (code) => {
                store.deleteItemToCart(code);
            },
            [store]
        ),
    };

    return (
        <PageLayout>
            <Head title={"Магазин"} />
            <Controls setOpenCart={setOpenCart} list={cart} />
            <List
                list={list}
                clickButton={callbacks.addItemBasket}
                clickName={"Добавить"}
            />
            <Cart
                list={cart}
                openCart={openCart}
                setOpenCart={setOpenCart}
                deleteItemBasket={callbacks.deleteItemBasket}
                rootRef={rootRef}
            />
        </PageLayout>
    );
}

export default App;
