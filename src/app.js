import {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import item from "./components/item";
import Modal from "./components/modal";
import ItemCart from "./components/item-cart";
import Total from "./components/total";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list
  const cartList = store.getState().cart
  const cartSum = store.getState().totalPrice
  const uniqTotal = store.getState().uniqTotal

  const [showCart, setShowCart] = useState(false)

  const callbacks = {
    onDeleteFromCart: useCallback((title) => {
      store.deleteItem(title);
    }, [store]),

    onAddToCart: useCallback((title) => {
      store.addToCart(title)
    }, [store]),
  }
  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls uniqTotal={uniqTotal} cartSum={cartSum} setShowCart={setShowCart}/>
      <List list={list}
            onAction={callbacks.onAddToCart}
            buttonTitle='Добавить'
            itemComponent={item}
      />
      {showCart &&
        <Modal setShowModal={setShowCart}>
          <Head title='Корзина' style={{marginBottom: '70px'}}/>
          <List
            list={cartList}
            onAction={callbacks.onDeleteFromCart}
            buttonTitle='Удалить'
            itemComponent={ItemCart}
          />
          <Total cartSum={cartSum}/>
        </Modal>
      }
    </PageLayout>
  );
}

export default App;
