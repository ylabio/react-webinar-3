import {memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Breadcrumbs from '../../components/breadcrumbs';
import FlexGroup from '../../components/flex-group';

function Main() {
  const page = Number(useParams().page);
  
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(10, (page - 1) * 10);
  }, [page]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    total: state.catalog.total,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    getPhrase: useCallback((phraseGroup, phraseCode, phraseDefault) => 
      store.actions.lang.getPhrase(phraseGroup, phraseCode, phraseDefault), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} getPhrase={ callbacks.getPhrase } />
    }, [callbacks.addToBasket, callbacks.getPhrase]),
  };

  return (
    <PageLayout>
      <Head title={ callbacks.getPhrase('general', 'shopTitle', 'Shop') }/>
      <FlexGroup>
        <Breadcrumbs getPhrase={ callbacks.getPhrase } />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} getPhrase={ callbacks.getPhrase } />
      </FlexGroup>
      <List list={select.list} renderItem={renders.item}/>

      <Pagination pages={Math.ceil(select.total / 10 || 1)} page={page || 1} />
    </PageLayout>

  );
}

export default memo(Main);
