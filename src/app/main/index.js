import {memo, useCallback, useEffect, useState} from 'react';
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

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const lastArticlesIndex = currentPage * articlesPerPage;
  const firstArticlesIndex = lastArticlesIndex - articlesPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    store.actions.catalog.load(firstArticlesIndex);
  }, [firstArticlesIndex]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    countItems: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение номера страницы
    onPageChange: useCallback((pageNumber) => setCurrentPage(pageNumber), [])
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
      <Pagination articlesPerPage={articlesPerPage} totalArticles={select.countItems}
                  currentPage={currentPage} onPageChange={callbacks.onPageChange} />
    </PageLayout>

  );
}

export default memo(Main);
