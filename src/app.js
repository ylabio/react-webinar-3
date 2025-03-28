import React, { useCallback, useMemo, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const [isOpen, setIsOpen] = useState(false);

  const totalQuantity = useMemo(
    () =>
      list.reduce((acc, item) => {
        const quantity = Math.max(0, Number(item?.quantity) || 0);
        return acc + quantity;
      }, 0),
    [list],
  );

  const totalPrice = useMemo(
    () =>
      list.reduce((acc, item) => {
        const quantity = Number(item?.quantity) || 0;
        const price = Number(item?.price) || 0;
        return acc + quantity * price;
      }, 0),
    [list],
  );

  const cartList = useMemo(() => {
    const items = {};
    list
      .filter(item => item?.quantity > 0)
      .forEach(item => {
        if (items[item.code]) {
          items[item.code].quantity += item.quantity;
        } else {
          items[item.code] = { ...item };
        }
      });
    return Object.values(items);
  }, [list]);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItemFromCart(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),

    onOpen: useCallback(() => {
      setIsOpen(true);
    }, [isOpen]),

    onClose: useCallback(() => {
      setIsOpen(false);
    }, [isOpen]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onOpen={callbacks.onOpen} quantity={totalQuantity} totalPrice={totalPrice} />
      <List list={list} onAddItem={callbacks.onAddItem} />
      <Modal isOpen={isOpen} onClose={callbacks.onClose} title="Корзина">
        {cartList.length > 0 ? (
          <>
            <List list={cartList} onDeleteItem={callbacks.onDeleteItem} quantity={totalQuantity} />
            <div className="Modal-footer">
              <span className="Modal-text">Итого:</span>
              <span className="Modal-text">{totalPrice.toLocaleString('ru-RU')}&nbsp;₽</span>
            </div>
          </>
        ) : (
          <span>Корзина пуста</span>
        )}
      </Modal>
    </PageLayout>
  );
}

export default App;
