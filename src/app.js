import React, { useCallback } from 'react';
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
    const list = store.getState().list;
    // Проверка открыта модалка или нет
    const [ modal, setModal ] = React.useState(false)
    // Итоговая цена
    const [ countPrice, setCountPrice ] = React.useState(0)
    //Массив с продуктами
    const [ products, setProducts ] = React.useState([])

    //Функция, которая добавляет продукты
    function addProduct(product) {
        const isProduct = products.some((prod) => prod.title === product.title);

        if (!isProduct) {
            setProducts([ ...products, {...product, countValue: 1} ]);
            setCountPrice(countPrice + product.price);
        }else {
            const updatedProducts = products.map((prod) => {
                if (prod.title === product.title) {
                    return {...prod, countValue: prod.countValue + 1};
                }
                return prod;
            });

            setProducts(updatedProducts);
            setCountPrice(countPrice + product.price);
        }
    }

    //Функция, которая удаляет полностью товар даже если товара больше 1 штуки
    function removeProduct(product) {
        setProducts(products.filter(e => e.code !== product.code))
        products.map(prod => {
            if (prod.title === product.title) {
                setCountPrice(countPrice - product.price * prod.countValue)
            }
        })
    }

    //Функция, которая удаляет товар по одной штуке если товара больше 1
    // function removeProduct(product) {
    //     const updatedProducts = products.map((prod) => {
    //         if (prod.title === product.title) {
    //             if (prod.countValue > 1) {
    //                 return { ...prod, countValue: prod.countValue - 1 };
    //             } else {
    //                 return null;
    //             }
    //         }
    //         return prod;
    //     });
    //
    //     setProducts(updatedProducts.filter((prod) => prod !== null));
    //     setCountPrice(countPrice - product.price);
    // }

    console.log(products)
    const callbacks = {
        onDeleteItem: useCallback((code) => {
            store.deleteItem(code);
        }, [ store ]),

        onSelectItem: useCallback((code) => {
            store.selectItem(code);
        }, [ store ]),

        onAddItem: useCallback(() => {
            store.addItem();
        }, [ store ])
    }

    return (
        <PageLayout>
            <Head title='Магазин'/>
            <Controls
                modal={modal}
                setModal={setModal}
                onAdd={callbacks.onAddItem}
                countPrice={countPrice}
                setCountPrice={setCountPrice}
                products={products}
                removeProduct={removeProduct}
            />
            <List list={list}
                  addProduct={addProduct}
                  onDeleteItem={callbacks.onDeleteItem}
                  onSelectItem={callbacks.onSelectItem}/>
        </PageLayout>
    );
}

export default App;
