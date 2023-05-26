import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useParams } from 'react-router-dom';

function Main() {
  const store = useStore();

  const {num} = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    currentPage: state.catalog.pagination.currentPage,
    pagesAmount: state.catalog.pagination.pagesAmount,

    amount: state.basket.amount,
    sum: state.basket.sum,

    languages: state.localization.list,
    currentLanguage: state.localization.currentLanguage
  }));

  useEffect(() => {
    if (num && num === 'number') store.actions.catalog.onChangePage(Number(num))
    store.actions.catalog.load();
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangeLanguage: useCallback((value) => store.actions.localization.onChangeLanguage(value), [store]),
    onChangePage: useCallback((page) => store.actions.catalog.onChangePage(Number(page)), [store]),
    localize: useCallback((text) => store.actions.localization.toLocalization(text), [select.currentLanguage])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} localize={callbacks.localize} />
    }, [callbacks.addToBasket, select.currentLanguage]),
  };

  return (
    <PageLayout>
      <Head title={callbacks.localize('shop')} onChangeLanguage={callbacks.onChangeLanguage} languages={select.languages} currentLanguage={select.currentLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} localize={callbacks.localize}/>
      <List list={select.list} renderItem={renders.item} />
      <Pagination currentPage={select.currentPage} pages={select.pagesAmount} onChangePage={callbacks.onChangePage}/>
    </PageLayout>
  );
}

export default memo(Main);
