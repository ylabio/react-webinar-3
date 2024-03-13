import {memo, useCallback, useEffect, useContext} from 'react';
import {LanguagesContext} from '../../lang/context';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import Nav from "../../components/nav";
import NavMenu from "../../components/nav-menu";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {
  const store = useStore();
  const {langData} = useContext(LanguagesContext);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    isLoading: state.catalog.isLoading,
    limit: state.catalog.limit,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.catalog.setIsLoading(select.isLoading);
    store.actions.catalog.load(select.limit, select.currentPage);
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addToBasket(item), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Обновление состояния текущей страницы
    setCurrentPage: useCallback(page => store.actions.catalog.setCurrentPage(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={langData.main.title}/>
      <Nav>
        <NavMenu langData={langData}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} langData={langData}/>
      </Nav>
      <Loader isLoading={select.isLoading}>
        <List list={select.list} renderItem={renders.item}/>
      </Loader>
      {!!select.list.length && 
        <Pagination totalCount={select.count} limit={select.limit} currentPage={select.currentPage} setCurrentPage={callbacks.setCurrentPage}/>
      }
    </PageLayout>
  );
}

export default memo(Main);
