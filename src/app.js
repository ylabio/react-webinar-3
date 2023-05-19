import React, { useCallback, useState } from 'react'
import List from './components/list'
import Controls from './components/controls'
import Head from './components/head'
import PageLayout from './components/page-layout'
import Modal from './components/modal'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalActive, setIsModalActive] = useState(false)

  const list = store.getState().list
  const cart = store.getState().cart
  const resultCart = store.getState().resultCart

  const callbacks = {
    onAddItemCart: useCallback(
      (item) => {
        store.onAddItemCart(item)
      },
      [store]
    ),
    onDeleteItemCart: useCallback((code) => {
      store.onDeleteItemCart(code)
    }, []),
    onToggleModal: useCallback(() => {
      setIsModalActive((prev) => !prev)
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        resultCart={resultCart}
        onToggleModal={callbacks.onToggleModal}
      />
      <List list={list} onAddItemCart={callbacks.onAddItemCart} />
      <Modal
        cart={cart}
        isModalActive={isModalActive}
        resultCart={resultCart}
        onToggleModal={callbacks.onToggleModal}
        onAddItemCart={callbacks.onAddItemCart}
        onDeleteItemCart={callbacks.onDeleteItemCart}
      />
    </PageLayout>
  )
}

export default App
