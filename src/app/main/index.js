import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {

  const store = useStore();
  const itemPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);

  useEffect(() => {
    store.actions.catalog.load(itemPerPage, (currentPage - 1) * itemPerPage, '(_id, title, price)');
  }, [currentPage]);

  const select = useSelector(state => ({
    count: state.catalog.count,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    setPageLimit(Math.ceil(select.count / itemPerPage));
  }, [select.count]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
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
      <Pagination pageLimit={pageLimit} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </PageLayout>
  );
}

export default memo(Main);
