import {memo, useCallback, useEffect} from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import PageSelect from "../../components/page-select";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  useEffect(() => {
    console.log('called useEffect on app/main');
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pageLength: state.catalog.pageLength,
    page: state.catalog.page,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const location = useLocation();
  const navigate = useNavigate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    // openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    openModalBasket: useCallback(() => {
      navigate('/cart', {
        state: { background: location }
      })
    })
  }

  const renders = {
    item: useCallback((item) => {
      console.log("within item render callback");
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
        <List list={select.list} renderItem={renders.item}/>
        <PageSelect 
          currentPage={select.page} 
          pages={Math.ceil(select.count / select.pageLength)} 
        />
    </PageLayout>

  );
}

export default memo(Main);
