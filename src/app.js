import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const {list, cart, totalPrice} = store.getState();
  const [visible, setVisible] = React.useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItemToCart(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItemToCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onAdd={callbacks.onAddItem}
                cart={cart}
                totalPrice={totalPrice}
                setActive={setVisible}
                active={visible}/>
      <List list={list}
            buttonText="Добавить"
            action={callbacks.onAddItem}/>
        {
            visible &&
            <Basket list={cart}
                    totalPrice={totalPrice}
                    onDeleteItemToCart={callbacks.onDeleteItem}
                    setActive={setVisible}
            />
        }
    </PageLayout>
  );
}

export default App;
