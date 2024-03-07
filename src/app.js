import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal/index";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalActive, setModalActive] = useState(false);
  const { items } = store.getState();
  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        setModalActive={setModalActive}
        cnt={store.countItemsInCart()}
        total={store.calcTotal()}
      />
      <List list={items} onAddItemToCart={store.addToCart} />
      <Modal
        active={modalActive}
        setActive={setModalActive}
        store={store}
      />
    </PageLayout>
  );
}

export default App;
