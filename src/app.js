import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Basket from './components/basket';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const listOfProducts = store.getState().productsList;
  const productCount = store.getState().productCount;
  const totalProductPrice = store.getState().totalProductPrice;
	const [open, setOpen] = useState(false);  

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls setOpen={setOpen} productCount={productCount} totalProductPrice={totalProductPrice}/>
      <List list={list} onButtonAction={callbacks.onAddItem}>
        <Item/>
      </List>
			{open && 
      <Modal setOpen={setOpen} modalTitle={'Корзина'}>
        <Basket listOfProducts={listOfProducts} onButtonAction={callbacks.onDeleteItem} totalProductPrice={totalProductPrice}/>
      </Modal>}
    </PageLayout>
  );
}

export default App;
