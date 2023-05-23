import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Popup from "./components/popup";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store]),

	onAddToCart: useCallback((id) => {
		store.addItemToCart(id)
	  }, [store]),

	togglePopup: () => {
		setIsOpenPopup(!isOpenPopup);
	  },
  }

  return (
    <PageLayout>
      {
      isOpenPopup &&
        (
          <Popup 
		  cart={cart}
		  title="Корзина"
          onDeleteItem={callbacks.onDeleteItem}
          closePopup={callbacks.togglePopup}
          />
        )
      }
      <Head title='Магазин'/>
      <Controls cart={cart} onOpenPopup={callbacks.togglePopup}/>
      <List list={list}
	  		buttonName = 'Добавить'
			buttonClickAction ={callbacks.onAddToCart}
      />
    </PageLayout>
  );
}

export default App;
