import {memo, useCallback, useEffect, useState, useMemo} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination"

function Main() {

  const store = useStore();
  const PageSize = 10
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    store.actions.item.setLoading(true);
    store.actions.catalog.load(PageSize, (currentPage - 1) * PageSize);
  }, [currentPage]);
  
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItemsCount: state.catalog.totalItemsCount
  }));

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
      <Pagination
        currentPage={currentPage}
        totalCount={select.totalItemsCount}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </PageLayout>
  );
}

export default memo(Main);
