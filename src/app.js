import React, { useCallback, useState } from 'react';
import './styles.css';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import { PageLayout } from "./components/page-layout";
import { getDeclension, sumReducer } from "./utils";
import Modal from "./components/modal";
import ModalContent from "./components/modal-content";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App( { store } ) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция для управления модальным окном
  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);


  const sumBasket = () => {
    const count = basket.length;
    const declension = getDeclension(count);

    return count === 0
      ? "Пусто"
      : `${count} товар${declension} / ${calculateTotal()} ₽`;
  };

  const onDeleteItem = useCallback( ( itemCode ) => {store.onDeleteItem( itemCode )}, [store] );

  const calculateTotal = ()=> store.calculateTotal(sumReducer);

  const addItem = useCallback( (code) => {
    store.addItem(code)
  }, [store] );

  return (
    <div className={"full-width-container"}>
      <PageLayout>
        <Head title={ "Магазин" }/>
        <Controls sumBasket={sumBasket} toggleModal={toggleModal} />
        <List list={list}  handleItemAction={addItem} calculateTotal={calculateTotal}/>
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <ModalContent toggleModal={toggleModal} basket={basket} handleItemAction={onDeleteItem} calculateTotal={calculateTotal}/>
        </Modal>
      </PageLayout>
    </div>
  );
}

export default App;
