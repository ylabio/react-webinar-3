import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import NavLayout from '../../components/nav-layout';
import Navbar from '../../components/navbar';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //Cмена страницы
    onChangeCurrentPage: useCallback((page) => store.actions.catalog.onChangePage(page),[store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} link={`/article/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      
        <Head title='Магазин'/>
        <NavLayout>
          <Navbar/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
        </NavLayout>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination
        currentPage={select.currentPage}
        totalPages={select.totalPages}
        onChangeCurrentPage={callbacks.onChangeCurrentPage}
        />
    </PageLayout>
  );
}

export default memo(Main);
