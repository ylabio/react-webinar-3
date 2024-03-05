import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart/cart';
import formatPrice from './helpers/formatPrice';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const isModalOpen = store.getState().isModalOpen
  const list = store.getState().list;
  const selectedItems = store.getState().selectedItems; 
  const countPrice = store.getState().countPrice;

  const callbacks = {

      onAddItem: useCallback((code) => {
          store.addItem(code);
    }, [store]),

    onToggleCart: useCallback(() => {
        if (isModalOpen) {
            store.closeModal();
        } else {
            store.openModal();
        }
    }, [isModalOpen, store])
  }
    function getItemsWord(count) {
        const lastDigit = count % 10;
        const secondLastDigit = Math.floor((count % 100) / 10);

        if (lastDigit === 1 && secondLastDigit !== 1) {
            return 'товар';
        } else if (lastDigit >= 2 && lastDigit <= 4 && secondLastDigit !== 1) {
            return 'товара';
        } else {
            return 'товаров';
        }
    }
  return (
    <PageLayout>
          <Head title='Магазин' />  
          <Controls onAction={callbacks.onToggleCart} title='Перейти'>
              <span>
                  В корзине: {selectedItems.length > 0 ? (
                      <strong className='counting'>{selectedItems.length} {getItemsWord(selectedItems.length)} / {formatPrice(countPrice)} ₽</strong>
                  ) : (
                      <strong className='counting'>пусто</strong>
                  )}
              </span>
          </Controls>
          <List titleButton={'Добавить'} list={list}
              onСlickItem={callbacks.onAddItem}/>
          <Cart store={store} />
   
    </PageLayout>
  );
}

export default App;
