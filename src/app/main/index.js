import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pages from '../../components/pages';
import Navigate from '../../components/navigate';

function Main() {

  const store = useStore();

  const [index, setIndex] = useState(0)

  useEffect(() => {
    store.actions.catalog.load(index);
  }, [index]);

  useEffect(() => {
    store.actions.catalog.findLimit();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    openCard: useCallback(_id => store.actions.catalog.openPage(_id),[store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onOpen={callbacks.openCard} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (  
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}>
        <Navigate />
      </BasketTool>
      <List list={select.list} renderItem={renders.item}/>
      <Pages handleClick={(count) => setIndex(count)} id={index} limit={select.limit} />
    </PageLayout>
    
  );
}

export default memo(Main);
