import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { calculateTotalPages } from '../../utils';

function Main() {

  const store = useStore();

  const language = useSelector(state => state.language);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem('currentPage') ? +localStorage.getItem('currentPage') : 1
  );

  useEffect(() => {
    store.actions.catalog.load((currentPage - 1) * 10);

  }, [currentPage]);

  useEffect(() => {
    async function fetchCount() {
      const count = await store.actions.catalog.getCount();
      setTotalPages(calculateTotalPages(count));
    };
    fetchCount();
  });
  
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);

  }, [currentPage]);

  useEffect(() => {
    const current = localStorage.getItem('currentPage');
    if (current) {
      setCurrentPage(+current);
    }
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={language?.market} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination totalPages={totalPages} currentPage={currentPage} onChangePage={setCurrentPage} />
    </PageLayout>

  );
}

export default memo(Main);
