import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const [showModal, setShowModal] = React.useState(false);
  const cart = store.getState().cart;
  const totalAmount = store.getState().totalAmount;
  const totalCount = store.getState().totalCount;

  const callbacks = {
    onDelete: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAdd: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls  onClick={() => setShowModal(true)}
          cart={cart}
          totalAmount={totalAmount}
          totalCount={totalCount}/>
      <Modal 
          show={showModal}
          setShow={setShowModal}
          cart={cart}
          totalAmount={totalAmount}
          onAdd={callbacks.onAdd}
          onDelete={callbacks.onDelete}>
      </Modal>
      <List list={list} onAdd={callbacks.onAdd} />
    </PageLayout>
  );
}

export default App;
