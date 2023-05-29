import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Navigation from '../../components/navigation';
import NavigationItems from '../../components/navigation-items';
import l from '../../languages/lang-rendering';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(select.currentPage);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pages: state.catalog.pages,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    lang: state.language.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback((page) => store.actions.catalog.load(page)),
    changeLang : useCallback((lang) => store.actions.language.setLanguage(lang))
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} link={`/product/${item._id}`} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={l('main')} changeLang={callbacks.changeLang} lang={select.lang} />
      <Navigation>
        <NavigationItems />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </Navigation>
      <List list={select.list} renderItem={renders.item} />
      <Pagination onPageChange={callbacks.changePage} totalPages={select.pages} currentPage={select.currentPage} />
    </PageLayout>
  );
}

export default memo(Main);
