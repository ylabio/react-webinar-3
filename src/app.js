<<<<<<< Updated upstream
import React from 'react';
import './styles.css';
=======
import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
>>>>>>> Stashed changes

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

<<<<<<< Updated upstream
  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{`${item.title} ${item.selectedCount > 0 ? `| Выделяли ${item.selectedCount} раз(а)` : ''}`}</div>
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
=======
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onOpenCart: useCallback(() => {
      setShowCart(true);
    }, [])

  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls onOpenCart={callbacks.onOpenCart}/>
      <List list={list}
             cartItems={cartItems}
             setCartItems={setCartItems} />
       {showCart && (
         <Cart onClose={() => setShowCart(false)}
               cartItems={cartItems}
               setCartItems={setCartItems} />
       )}
    </PageLayout>
>>>>>>> Stashed changes
  );
}

export default App;
