import React, {useCallback, useState} from 'react';
import PageLayout from './components/page-layout';
import Head from './components/head';
import Info from './components/info';
import CartInfo from './components/cart-info';
import Button from './components/button';
import Modal from './components/modal';
import CartDetails from './components/cart-details';
import List from './components/list';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cartItems, cartTotal, cartCost} = store.getState();

  const [isOpen, setIsOpen] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, [store]),

    onCartOpen: useCallback((e) => {
       e.stopPropagation();
       setIsOpen(true);
     }, []),
    onCartClose: useCallback(() => setIsOpen(false), []),
  }

  const renderCatalogItem = useCallback(
    (item) => <Item item={item} onAdd={callbacks.onAddToCart} />, [])

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Info>
        <CartInfo total={cartTotal} cost={cartCost} />
        <Button className='Info_btn'
              onOpen={callbacks.onCartOpen}
              title='Перейти'
        />
      </Info>
      <Modal isOpen={isOpen} onClose={callbacks.onCartClose}>
        <CartDetails cartItems={cartItems}
                     cost={cartCost}
                     onClose={callbacks.onCartClose}
                     onRemove={callbacks.onRemoveFromCart}
        />
      </Modal>
      <List list={list}
            render={renderCatalogItem}/>
    </PageLayout>
  );
}

export default App;
