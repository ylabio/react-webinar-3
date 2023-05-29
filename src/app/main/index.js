import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Separator from '../../components/separator';
import NavMenu from '../../components/nav-menu';

export const navList = [{
  title: "Главная",
  link: "/"
}]

function Main() {

  const store = useStore();

  
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages
  }));

  useEffect(() => {
    store.actions.catalog.load(select.currentPage);
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(product => store.actions.basket.addToBasket(product), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //Изменена текущая страница
    setCurrentPage: useCallback((page) => store.actions.catalog.setCurrentPage(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Separator>
        <NavMenu navList={navList}></NavMenu>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </Separator>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={select.currentPage} totalPages={select.totalPages} setCurrentPage={callbacks.setCurrentPage}></Pagination>
    </PageLayout>

  );
}

export default memo(Main);
