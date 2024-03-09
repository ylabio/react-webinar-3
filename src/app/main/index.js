import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import NavigationTool from '../../components/navigation-tool';
import Navigation from '../../components/navigation';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.count,
    itemsPerPage: state.catalog.limit,
    currentPage: state.catalog.pageNumber,
    isLoading: state.catalog.isLoading
  }));

  useEffect(() => {
    store.actions.catalog.loadWithParams(select.currentPage);
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы
    setPage: useCallback(currentPage => store.actions.catalog.loadWithParams(currentPage), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} link={`card/${item._id}`} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <NavigationTool>
        <Navigation navItems={[{title: 'Главная', link: '/'}]} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </NavigationTool>
      <List list={select.list} renderItem={renders.item} isLoading={select.isLoading}/>
      {
        select.totalItems > select.itemsPerPage ?
        <Pagination
          itemsPerPage={select.itemsPerPage}
          totalItems={select.totalItems}
          currentPage={select.currentPage}
          paginate={callbacks.setPage}
        /> : ''
      }
    </PageLayout>

  );
}

export default memo(Main);
