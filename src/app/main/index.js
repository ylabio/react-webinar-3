import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useSearchParams } from 'react-router-dom'
import Navigation from '../../components/navigation';
import HeaderContent from '../../components/header-content';
import LoaderLayout from '../../components/loader-layout';

function Main() {
  const store = useStore();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageNum = searchParams.get('page');

  const select = useSelector(state => ({
    list: state.catalog.list,
    pagination: state.catalog.pagination,
    isLoading: state.catalog.isLoading,
    isError: state.catalog.isError,

    amount: state.basket.amount,
    sum: state.basket.sum,

    languages: state.localization.list,
    currentLanguage: state.localization.currentLanguage
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangeLanguage: useCallback((value) => store.actions.localization.onChangeLanguage(value), [store]),
    onChangePage: useCallback((page) => store.actions.catalog.onChangePage(Number(page)), [store]),
    localize: useCallback((text) => store.actions.localization.toLocalization(text), [select.currentLanguage])
  }

  useEffect(() => {
    if (pageNum || pageNum === 'number') store.actions.catalog.onChangePage(Number(pageNum))
    if (!pageNum) store.actions.catalog.onChangePage(1);
  }, [pageNum]);

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} localize={callbacks.localize} url={`/good/${item._id}`} />
    }, [callbacks.addToBasket, select.currentLanguage]),
  };

  return (
    <PageLayout>
      <Head title={callbacks.localize('shop')} onChangeLanguage={callbacks.onChangeLanguage} languages={select.languages} currentLanguage={select.currentLanguage}/>
      <HeaderContent>
        <Navigation localize={callbacks.localize} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} localize={callbacks.localize}/>
      </HeaderContent>

      <LoaderLayout isLoading={select.isLoading} isError={select.isError} localize={callbacks.localize}>
        <>
          <List list={select.list} renderItem={renders.item} />
          <Pagination currentPage={select.pagination.currentPage} pages={select.pagination.pagesAmount} onChangePage={callbacks.onChangePage}/>
        </> 
      </LoaderLayout>
    </PageLayout>
  );
}

export default memo(Main);
