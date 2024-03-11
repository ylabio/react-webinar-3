import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useState } from 'react';

function Main() {

  const store = useStore();
    const [limit, setLimit] = useState(2); 
    const [skip, setSkip] = useState(0); 

    useEffect(() => {
        store.actions.catalog.load({ limit, skip });
    }, [limit, skip, store.actions.catalog]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    isLastPage: state.catalog.isLastPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      nextPage: useCallback(() => {
          setSkip(skip + limit); 
      }, [skip, limit]),
      prevPage: useCallback(() => {
          setSkip(Math.max(0, skip - limit));
      }, [skip, limit])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
          
          <div>
              {skip > 0 && <button onClick={callbacks.prevPage}>Предыдущая страница</button>}
              {!select.isLastPage && <button onClick={callbacks.nextPage}>Следующая страница</button>}
          </div>
    </PageLayout>

  );
}

export default memo(Main);
