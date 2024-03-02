import React, {useCallback, useState} from "react";
import PageLayout from "./components/shop-layout";
import Head from "./components/head";
import Controls from "./components/controls";
import ShopList from "./components/shop-list";
import CartList from "./components/cart-list";
import CartFoot from "./components/cart-foot";
import Modal from "./components/modal";

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
      <ShopList list={list} onAdd={callbacks.onAddItem}/>
      <Modal title='Корзина' isOpen={isOpenCart} close={CloseCart}>
        <CartList carts={carts} onDelete={callbacks.onDeleteItem}/>
        {isEmptyCart && <CartFoot sum={totalSum()}/>}
      </Modal>
    </PageLayout>
  )
}

export default App;