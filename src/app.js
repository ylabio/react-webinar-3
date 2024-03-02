import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {list, cart} = store.getState();
  
  const onAddItem = useCallback((code) => {
    store.addItem(code);
  }, [store]);

  const onDeleteItem = useCallback((code) => {
    store.deleteItem(code);
  }, [store]);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, [])

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [])

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart}
                onPreview={onOpenModal}
                />
      <List list={list}
            onClick={onAddItem}
            buttonText='Добавить'/>
      {isModalOpen && <CartModal 
        onClose={onCloseModal}
        data={cart} 
        onDelete={onDeleteItem}
      />}
    </PageLayout>
  );
}

export default App;
