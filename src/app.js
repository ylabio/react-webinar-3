import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { Popup } from './components/popup';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [active, setActive] = useState(false)
  const [count, setCount] = useState(0)
  const {list, basket, sumPrice, sumCount} = store.getState();
  const callbacks = {
    /* onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),
    
    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]), */
    addBasketItem: useCallback((code) => {
      store.addBasketItem(code)
    },[store]),
    handleClickDelete: useCallback((code) => {
      store.handleClickDelete(code)
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls setActive={setActive} sumPrice={sumPrice} sumCount={sumCount}/>
      {active && <Popup active={active} setActive={setActive} basket={basket} handleClick={callbacks.handleClickDelete} sumPrice={sumPrice}/> }
      <List list={list}
            active={active}
            buttonName='Добавить'
            handleClick={callbacks.addBasketItem}/>
    </PageLayout>
  );
}

export default App;
