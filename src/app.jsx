import React, { useCallback } from 'react';
import List from "./components/list/index.jsx";
import Controls from "./components/controls/index.jsx";
import Head from "./components/head/index.jsx";
import PageLayout from "./components/page-layout/index.jsx";
import PageLayoutModal from "./components/page-layout-modal/index.jsx";
import Cart from "./components/cart/index.jsx";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
    const { list, cart, isShow, sum, count } = store.getState();

    const callbacks = {
        onAddItemToCart: useCallback((code) => {
            store.addItemToCart(code);
        }, [store]),
        toggleModal: useCallback(() => {
            store.toggleModal()
        }, [store]),
        onRemoveItem: useCallback((code) => {
            store.removeItemFromCart(code)
        }, [store])
    };

    return (
        <>
            <PageLayout>
                <Head title='Магазин' />
                <Controls
                    count={count}
                    sum={`${sum} ₽`}
                    onGoToCart={callbacks.toggleModal}
                />
                <List
                    list={list}
                    onClick={callbacks.onAddItemToCart}
                    buttonText="Добавить"
                />
            </PageLayout>
            {isShow ?
                <PageLayoutModal>
                    <Cart cart={cart}
                        onRemoveItem={callbacks.onRemoveItem}
                        onClose={callbacks.toggleModal}
                        sum={sum}
                    />
                </PageLayoutModal>
                : null}
        </>
    )
}

export default App;
