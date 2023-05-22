import React, {useCallback, useState} from 'react';
import ModalLayout from "./components/modal-layout";
import List from "./components/list";
import ItemBasket from "./components/item-basket";
import BasketHead from "./components/basket-head";
import BasketTotal from "./components/basket-total";
import ItemMarket from "./components/item-market";
import PageLayout from "./components/page-layout";
import MarketHead from "./components/market-head";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalMode, setModalMode] = useState(false);

  const onOpenModal = () => {
    setModalMode(true);
  };
  const onCloseModal = () => {
    setModalMode(false);
  };

  const list = store.getState().list;
  const listForBasket = store.getState().listForBasket;
  const totalPrice = store.getState().totalPrice;
  const totalNumberOfAddedItems = store.getState().totalNumberOfAddedItems;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItemFromBasket(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddItemToBasket: useCallback((code) => {
      store.addItemToBasket(code);
    }, [store]),
  }

  return (
    <div>
      <PageLayout>
        <MarketHead
          onOpenModal={onOpenModal}
          totalItems={totalNumberOfAddedItems}
          totalPrice={totalPrice}/>
        <List list={list}
              onBtnClick={callbacks.onAddItemToBasket}
              buttonText={'Добавить'}
              ListItem={ItemMarket}/>
      </PageLayout>
      {
        modalMode &&
        <ModalLayout>
          <BasketHead onCloseBasket={onCloseModal}/>
          <List list={listForBasket}
                onBtnClick={callbacks.onDeleteItem}
                buttonText={'Удалить'}
                ListItem={ItemBasket}/>
          <BasketTotal totalPrice={totalPrice}/>
        </ModalLayout>
      }
    </div>
  );
}

export default App;
