import React, {useCallback,useState} from 'react';
import List from "../components/list";
import TopItem from "../components/top-item/index.js";
import Head from "../components/head";
import PageLayout from "../components/page-layout";
import BasketApp from "../components/basket";

/**
 * Приложение
 * @param store {ShopStore} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function ShopApp({store}) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const list = store.getState().list;
  const listBasket = store.getState().listBasket;

  const actionShop = 0;
  const actionBasket = 1;

  const callbacks = {
    onSetShowModalOn: () => {
      setShowModal(true);
    },

    onAmountProduct: useCallback(() => {
      return (store.amountProduct())
    }, [store]),

    onAmountPrice: () => {
      return (store.amountPrice())
    },

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
  };

  const vBasketApp = 
    <BasketApp showModal={showModal}
               handleClose={handleClose}
               list={list}
               listBasket={listBasket}
               onFunc={callbacks.onDeleteItem}
               action={actionBasket}
               onAmountPrice={callbacks.onAmountPrice}/>

  return (
    <div>
      <main>
      <PageLayout page={actionShop}>
        <Head title='Магазин' orange={false}/> 
        <TopItem onBasket={callbacks.onSetShowModalOn}
                 onAmountProduct={callbacks.onAmountProduct}
                 onAmountPrice={callbacks.onAmountPrice}/>
        <List list={list}
              listBasket={listBasket}
              onFunc={callbacks.onAddItem}
              action={actionShop}/>
      </PageLayout>
      </main>
      {vBasketApp}
    </div>
  );
}

export default ShopApp;
