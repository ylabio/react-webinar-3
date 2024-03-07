import React from 'react';
import List from "./components/list";
import Item from './components/item';
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal/index';
import Title from './components/title/index';
import Total from './components/total/index';
import BasketItem from './components/basket-item/index';
import ItemCount from './components/item-count/index';
import { countOccurrences, formatPrice } from './utils';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;

  const [isBasketOpen, setIsBasketOpen] = React.useState(false);

  return (
    <PageLayout>
      <Head title='Магазин' />
      <div className='Controls'>
        <ItemCount
          count={store.getState().productCount}
          finalPrice={formatPrice(store.getState().finalPrice)}
        />
        <Controls onOpenBasket={() => setIsBasketOpen(true)} />
      </div>
      
      <List list={list} onAction={store.addProduct} ItemComponent={Item}/>
      {
        isBasketOpen &&
        <>
          <div className='Overlay' />
          <Modal>
            <Title onClose={() => setIsBasketOpen(false)}>Корзина</Title>
            <List
              list={countOccurrences(store.getState().productList)}
              onAction={store.deleteProduct}
              ItemComponent={BasketItem}
            />
            <Total finalPrice={store.getState().finalPrice} />
          </Modal>
        </>  
      }
    </PageLayout>
  );
}

export default App;
