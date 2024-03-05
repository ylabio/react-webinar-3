import React, {useCallback, useState} from 'react';
import List from './components/list';
import Item from './components/item';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const amount = store.getState().amount;
  const sum = store.getState().sum;
  const itemsInCart = [...store.itemsInCart];
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('Modal-open');
  };

  const callbacks = {
    onAddItemInCart: useCallback((code) => {
      store.addItemInCart(code);
      store.calculateAmountItems();
    }, [store]),

    onDeleteItemInCart: useCallback((code) => {
      store.deleteItemInCart(code);
      store.calculateAmountItems();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalCartAmount={amount} sumPrices={sum} showModal={showModal} setShowModal={setShowModal}/>
      <List list={list} onAddItemInCart={callbacks.onAddItemInCart}/>
      <Modal modalTitle='Корзина' active={showModal} onClose={closeModal}>
        <div>
          {itemsInCart.map(item =>
            <div key={item.code} className='Cart-item'>
              <Item item={item} buttonTitle='Удалить' active={true} onDeleteInCart={callbacks.onDeleteItemInCart} />
            </div>
          )}
        </div>
        <div className='Modal-footer'><span>Итого</span> {sum} ₽</div>
      </Modal>
    </PageLayout>
  );
}

export default App;
