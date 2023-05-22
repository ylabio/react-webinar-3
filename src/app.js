import React, {useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cartList} = store.getState();

  const [cartIsOpen, setCartIsOpen] = useState(false)


  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls
        cartList={cartList}
        setCartState={setCartIsOpen}
      />
      {
        cartIsOpen ?
          <Cart
            cartList={cartList}
            setCartState={setCartIsOpen}
          /> : null
      }
      <List
        list={list}
        actionItem='add'
      />
    </PageLayout>
  );
}

export default App;
