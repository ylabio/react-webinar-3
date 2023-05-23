import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import {Sum_total} from "./utils";
import {Cart} from "./components/cart";

function App({store}) {

    const {cart, list} = store.getState();
    const [Modal_visible, setModal_visible] = useState(false);

    const callbacks = {
        onAddToCart: useCallback((code) => {
            store.addToCart(code);
        }, [store]),
        onDelete_item: useCallback((code) => {
            store.Delete_item(code);
        },[store]),
        onModal_visible: useCallback(() => {
            setModal_visible(!Modal_visible);
        }, [Modal_visible])
    }

    return (
        <PageLayout>
            {Modal_visible ? <Cart cart={cart} onDoSmth={callbacks.onDelete_item} onClose={callbacks.onModal_visible} /> : ""}
            <Head title='Магазин'/>
            <Controls itemsCount={cart.length} sum={Sum_total(cart)} onOpenCart_button={callbacks.onModal_visible}/>
            <List list={list} onAction={callbacks.onAddToCart} />
        </PageLayout>
    );
}

export default App;