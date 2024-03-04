import React, {useCallback, useEffect, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/Modal';
import OrderDetails from './components/orderDetails';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [showModal, setShowModal] = useState(false)
  const [basket, setBasket] = useState({list:[], totalPrice: 0})

  const list = store.getState().list;

  useEffect(() => {
      const sum = basket.list.reduce((prev, item) => prev + (item.count * item.price), 0) || 0;
      setBasket((prevBasket) => ({...prevBasket, totalPrice: sum}));
}, [basket.list]);

  const callbacks = {
    onOpenPopUp: (e) => {
      setShowModal(true);
    },

    onClosePopUp: (e) => {
      setShowModal(false);
    },

    onAddItem: useCallback(
      (item) => {
        const product = basket.list.some(
          (product) => product.code === item.code
        );
        if (product) {
          const updateItem = basket.list.map((obj) => {
            if (obj.code === item.code) {
              return { ...obj, count: obj.count + 1 };
            }
            return obj;
          });
          setBasket((prevBasket) => ({...prevBasket, list: [...updateItem]}));
        } else {
          const newItem = { ...item, count: 1 };
          setBasket((prevBasket) => ({
            ...prevBasket,
            list: [...prevBasket.list, newItem],
          }));
        }
      },
      [basket.list]
    ),

    onDeleteItem: useCallback((item) => {
      setBasket(prevBasket => ({...prevBasket, list: [...prevBasket.list.filter(obj => obj.code !== item.code)]}));
    }, [store]),

  }

  return (
    <>
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenPopUp={callbacks.onOpenPopUp} totalPrice={basket.totalPrice} itemsCount={basket.list.length}/>
      <List
        list={list}
        onClick={callbacks.onAddItem}>добавить</List>
    </PageLayout>

    {showModal && <Modal onClosePopUp={callbacks.onClosePopUp}>
      <OrderDetails
        basket={basket}
        onDeleteItem={callbacks.onDeleteItem}
        onClosePopUp={callbacks.onClosePopUp}>
      </OrderDetails>
    </Modal>}
    </>
  );
}

export default App;
