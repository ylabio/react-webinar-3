import {memo, useCallback, useEffect} from 'react';
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

  useEffect(() => {
    store.actions.catalog.loadCatalog(1);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
		count: state.catalog.totalCount,
    size: state.catalog.pageSize,
    page: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
		onChangePage: useCallback(page => store.actions.catalog.loadCatalog(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} link={`/card/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} 
									amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} 
						renderItem={renders.item}/>
			<Pagination totalCount={select.count} 
									currentPage={select.page} 
									pageSize={select.size} 
									siblingCount={1} 
									onChangePage={callbacks.onChangePage}/>
    </PageLayout>

  );
}

export default memo(Main);
