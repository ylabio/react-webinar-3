import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalActive, setModalActive] = useState(false)
  const list = store.getState().list;
  const basket = store.getState().basket;
  let calculatePrice = store.getState().calculatePrice;
  let totalGoods = store.getState().totalGoods;

  const callbacks = {
    onDeleteItem: useCallback((code, quantity) => {
      store.deleteItem(code,quantity);
    }, [store]),
    onAddItem: useCallback((code, title, price) => {
      store.addItemToBasket(code, title, price);
    }, [store]),
  }

  return (<>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls basket={basket}
                  calculatePrice={calculatePrice}
                  setActive={setModalActive}
                  totalGoods={totalGoods}
        />
        <List list={list}
            onAddItem={callbacks.onAddItem}
        />

      </PageLayout>
      <Modal active={modalActive}
             setActive={setModalActive}>
        <Head title='Корзина' active={modalActive} setActive={setModalActive}/>
        <div> {basket.length
              ?basket.map(item =>
                <div key={item.code} className='List-item'>
                  <Item item={item} onDeleteItem={callbacks.onDeleteItem} active={modalActive}/>
                </div>)
            :<div className='List-empty'>пусто</div>}
        </div>
        <div className={'Modal-prise'}>{basket.length? <>Итого <span className={'Item-price'}>{calculatePrice} ₽</span></> :<></> }</div>
      </Modal>
  </>

  );
}

export default App;
