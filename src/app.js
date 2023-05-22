import React, { useCallback, useState } from 'react'
import List from './components/list'
import Controls from './components/controls'
import Head from './components/head'
import PageLayout from './components/page-layout'
import Cart from './components/cart'

/**
 *
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalCart, setModalCart] = useState(false)
  const list = store.getState().list
  const products = list.filter((elem) => elem.count)

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        store.addProduct(code)
      },
      [store],
    ),

    onDelete: useCallback(
      (code) => {
        store.deleteProduct(code)
      },
      [store],
    ),

    onOpenCart: useCallback(() => {
      setModalCart(true)
    }, []),

    onCloseCart: useCallback(() => {
      setModalCart(false)
    }, []),
  }

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onOpenCart={callbacks.onOpenCart}
        totalPrice={store.totalPrice}
        totalCount={store.totalCount}
        products={products}
      />
      <List list={list} onClick={callbacks.onAddToCart} textBtn="Добавить" />
      {modalCart && (
        <Cart
          products={products}
          totalPrice={store.totalPrice}
          onCloseCart={callbacks.onCloseCart}
          onDelete={callbacks.onDelete}
        />
      )}
    </PageLayout>
  )
}

export default App
