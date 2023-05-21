import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
    const list = store.getState().list;
    // Проверка открыта модалка или нет
    const [ modal, setModal ] = React.useState(false)

    function closeModal() {
        setModal(false)
    }

    function showModal() {
        setModal(true)
    }

    const callbacks = {
        onDeleteItem: useCallback((code) => {
            store.deleteItem(code);
        }, [ store ]),

        onSelectItem: useCallback((code) => {
            store.selectItem(code);
        }, [ store ]),

        onAddItem: useCallback(() => {
            store.addItem();
        }, [ store ]),

        onAddProducts: useCallback((product) => {
            store.addProduct(product);
        }, [ store ]),

        onRemoveProducts: useCallback((product) => {
            store.removeProduct(product);
        }, [ store ])
    }

    return (
        <PageLayout>
            <Head title='Магазин'/>
            <Controls
                showModal={showModal}
                countPrice={store.countPrice}
                products={store.products}
            />
            {modal && (
                <Modal
                    countPrice={store.countPrice}
                    closeModal={closeModal}
                    modal={modal}
                    products={store.products}
                    removeProduct={callbacks.onRemoveProducts}
                />
            )}
            <List
                list={list}
                addProduct={callbacks.onAddProducts}
            />
        </PageLayout>
    );
}

export default App;
