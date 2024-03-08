import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Routes, Route } from 'react-router-dom';
import PageLayout from '../components/page-layout';
import Head from '../components/head';
import BasketTool from '../components/basket-tool';
import { useLocation } from 'react-router-dom';
import Item from '../components/item';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();

  const location = useLocation()

  const [currentItem, setCurrentItem] = useState({})

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    const pathname = location.pathname;
    const state = location.state
    console.log(location.state)  
    if (pathname.includes('item')) {
      store.actions.modals.close('basket')
      fetch(`/api/v1/articles/${state}?fields=*,madeIn(title,code),category(title)`)
        .then(res => res.json())
        .then(data => setCurrentItem(data.result))
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={
        <>
          <Main/>
          {activeModal === 'basket' && <Basket/>}
        </>
        }/>
        <Route path="item/:id" 
          element={
          <PageLayout>
            <Head title={currentItem.title}/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <Item item={currentItem} onAdd={callbacks.addToBasket}/>
            {activeModal === 'basket' && <Basket/>}
          </PageLayout>
          }
          />
      </Routes>
    </>
  );
}

export default App;
