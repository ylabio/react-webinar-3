import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import SimpleModal from './components/simple-modal';
import TotalBasket from './components/total-basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const result = store.getState().result;

  const [modalInfoIsOpen, setModalInfoOpen] = useState(false);


  const callbacks = {

    onAbbBasket: useCallback(
        code => {
          store.addBasket(code);
        },
        [store],
    ),



    onDeleteBasket: useCallback(
        code => {
            store.deleteBasket(code);
        },
        [store],
    ),
  };

  return (
    <>
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        sum = {result[0]}
        quantitProduct={result[1]}
        onOpen={()=> setModalInfoOpen(true)} 
      />
      <List
        list={list}
        onAbbBasket={callbacks.onAbbBasket}
      />
    </PageLayout>

       <SimpleModal isOpen={modalInfoIsOpen} onClose={()=> setModalInfoOpen(false)}>
        <List list={basket} onDeleteBasket={callbacks.onDeleteBasket}/>
        <TotalBasket sum={result[0]}/>
       </SimpleModal>

    </>
  );
}

export default App;
