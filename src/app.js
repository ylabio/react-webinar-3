import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Popup from './components/popup';
import Cart from './components/cart';
import ItemList from './components/item-list';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [openPopup, setOpenPopup] = useState(false)
  const list = store.getState().list;
  const shopCart = store.getShopCart();

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),
    onOpenPupup: useCallback(() => {
      setOpenPopup(!openPopup)
    }, [openPopup]),
    onRemoveItem: useCallback((item) => {
      store.removeItem(item)
    }, [])
  }

  const renderListItems = useCallback((item, onClickItem) => {
    return <ItemList item={item} onClickItem={onClickItem} />;
  }, [])

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls shopCart={shopCart} onOpenPupup={callbacks.onOpenPupup} />
      <List list={list} onClickItem={callbacks.onAddItem} renderListItems={renderListItems} />
      {openPopup && <Popup setOpenPopup={callbacks.onOpenPupup}>
        <Cart shopCart={shopCart} onRemoveItem={callbacks.onRemoveItem} setOpenPopup={callbacks.onOpenPupup} />
      </Popup>}
    </PageLayout>
  );
}

export default App;
