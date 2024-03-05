import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from './components/cart-modal';
import ModalLayout from './components/modal-layout';
import Item from './components/item';
import CartItem from './components/cart-item';
import CartSum from './components/cart-sum';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {list, cart, totalAmount, totalSum} = store.getState();
  
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
                totalAmount={totalAmount}
                totalSum={totalSum}
                onPreview={onOpenModal}
                />
      <List list={list}
            render={(item) => <Item item={item} onClick={onAddItem} />}/>
      {isModalOpen && 
      <ModalLayout>
        <CartModal 
          data={cart}
          onClose={onCloseModal}
        >
          <List list={cart}
                render={(item) => <CartItem item={item} onClick={onDeleteItem} />}/>
          <CartSum totalSum={totalSum} />
        </CartModal>
      </ModalLayout>}
    </PageLayout>
  );
}

export default App;
