import React, {useCallback, useState} from "react";
import PageLayout from "./components/page-layout";
import Head from "./components/head";
import Controls from "./components/controls";
import Modal from "./components/modal";
import List from "./components/list";
import Foot from "./components/foot";

function App ({store}) {

  const [isOpenCart, setIsOpenCart] = useState(false)

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.onDeleteToCardItem(code);
    }, [store]),
    onAddItem: useCallback((code) => {
      store.onAddToCardItem(code);
    }, [store])
  }

  const OpenCart = () => {
    setIsOpenCart(true)
  }

  const CloseCart = () => {
    setIsOpenCart(false)
  }

  const list = store.getState().list;
  const carts = store.getState().baskets;

  const totalSum = () => carts.reduce((acc, rec) => {
    return rec.price * rec.basketCount + acc;
  }, 0);


  const isEmptyCart = Boolean(carts.length)
  const cartsCount = carts.length

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls sum={totalSum()} count={cartsCount} carts={carts} openCart={OpenCart}/>
      <List
        list={list}
        funcForBtn={callbacks.onAddItem}
        labelForBtn='Добавить'
        emptyText='Товаров пока нет.'
      />
      <Modal
        title='Корзина'
        isOpen={isOpenCart}
        close={CloseCart}
        foot={isEmptyCart && <Foot sum={totalSum()}/>}
      >
        <List
          list={carts}
          funcForBtn={callbacks.onDeleteItem}
          labelForBtn='Удалить'
          emptyText='Ваша корзина пуста.'
        />
      </Modal>
    </PageLayout>
  )
}

export default App;