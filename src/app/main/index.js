import {memo, useCallback, useEffect, useMemo} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Navigation from '../../components/navigation';
import Loader from '../../components/loader';

function Main() {

  const store = useStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const onSetCurrentPaginationPage = (currentPaginationPage) => {
    store.actions.catalog.load(currentPaginationPage);
  }

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    isLoading: state.catalog.isLoading
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => navigate('/basket', {state : {background: location} })),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <div>
        <Navigation amount={select.amount} sum={select.sum} onOpenBasket={callbacks.openModalBasket} />
        {select.isLoading ? <Loader /> : <List list={select.list} renderItem={renders.item}/>}
      </div>
      {select.totalPages > 1
      && 
      <Pagination totalPages={select.totalPages} currentPage={select.currentPage} setCurrentPage={onSetCurrentPaginationPage} />}
    </PageLayout>

  );
}

export default memo(Main);
