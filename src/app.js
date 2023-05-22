import React, { useState, useCallback, useMemo } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import PageModal from './components/page-modal';
import { Context } from './components/context';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({store}) {
  const [defaultContext, modifiedContext] = useState([]);

  const [defaultModalActive, modifiedModalActive] = useState(false);
  const [defaultvalueAllPrice, modifiedvalueAllPrice] = useState(0);

  const list = store.getState().list;

  const switchModal = useCallback(() => {
    modifiedModalActive(!defaultModalActive);
  }, [defaultModalActive]);

  useMemo(() => {
    let allPrice = defaultContext.reduce((prev, elem) => {
      return elem.price * elem.count + prev;
    }, 0);

    modifiedvalueAllPrice(allPrice);
  }, [defaultContext]);

  return (
    <Context.Provider value={{
      defaultContext,
      modifiedContext
    }}>
      <PageLayout>
        <Head title='Магазин' callback={switchModal}/>
        <Controls callback={switchModal} allPrice={defaultvalueAllPrice}/>
        <List list={list}/>
      </PageLayout>

      <PageModal>
        <Modal activeModal={defaultModalActive} callback={switchModal} allPrice={defaultvalueAllPrice}/>
      </PageModal>
    </Context.Provider>
  );
}

export default App;
