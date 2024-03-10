import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(select.page);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    limit: state.catalog.limit,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading: state.catalog.isLoading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangePage : useCallback(page => store.actions.catalog.load(page), [store]),
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
      {select.isLoading
        ? <h2>Загрузка</h2>
        : <List list={select.list} renderItem={renders.item}/>
      }
      <Pagination onChangePage={callbacks.onChangePage} limit={select.limit} count={select.count} page={select.page}/>
    </PageLayout>

  );
}

export default memo(Main);
