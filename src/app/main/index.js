import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Menu from '../../components/menu';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    setCatalogPage: useCallback((page) => store.actions.catalog.setPage(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} path='/article/'/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Menu href='/'/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum}/>
      </div>
      
      <List list={select.list} renderItem={renders.item}/>
      {select.count ? <Pagination page={select.page} count={select.count} onClickPage={callbacks.setCatalogPage}/> : 'Loading...'}
    </PageLayout>

  );
}

export default memo(Main);
