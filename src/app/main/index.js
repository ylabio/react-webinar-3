import {memo, useCallback, useContext, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useTranslate } from '../../translate'
import { Outlet } from 'react-router-dom';
import { url } from '../../url';
import MainMenu from '../../components/main-menu';


function Main() {

  const store = useStore();
const {translate}=useTranslate()

  useEffect(() => {
    store.actions.catalog.getPageLoad(0,10);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onGetPageLoad:useCallback((skip,limit)=>store.actions.catalog.getPageLoad(skip,limit)),
    onGetCountItems: useCallback(() => store.actions.catalog.getCountItems(), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} url={url.product}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
                  <MainMenu title={translate('shop')} sum={select.sum} url={url.main} onOpen={callbacks.openModalBasket} amount={select.amount}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination getPageLoad={callbacks.onGetPageLoad} onGetCountItems={callbacks.onGetCountItems} limit={10}/>
      <Outlet/>
    </PageLayout>

  );
}

export default (Main);
