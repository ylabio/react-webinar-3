import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Button from './components/button';
import Total from './components/total';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [cartOpen, setCartOpen] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalCount = store.getState().totalCount;
  const totalPrice = store.getState().totalPrice;

  const callbacks = {
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),
    deleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store])
  }

  return (
      <PageLayout cartOpen={cartOpen}>
        {cartOpen ? 
          <Modal>
          <Head title="Корзина">
            <Button onClick={() => setCartOpen(false)} name='Закрыть'/>
          </Head>
          {cart.length > 0 
          ? 
          <>
            <List list={cart}
                  deleteFromCart={callbacks.deleteFromCart}
                  cartOpen={cartOpen}
            />
            <Total totalPrice={totalPrice} />
          </>  
          : <p style={{padding:'0 20px'}}>Здесь пока пусто...</p>
          }
        </Modal> : null
        }
        <Head title='Магазин'/>
        <Controls totalCount={totalCount} totalPrice={totalPrice} openCart={setCartOpen} />
        <List list={list}
              addToCart={callbacks.addToCart}/>
      </PageLayout>
  );
}

export default App;
