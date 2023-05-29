import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PaginationButtons from '../../components/pagination-buttons';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pageNumber: state.catalog.pagination.currentPage,
    selectedLanguage: state.language.language,
    paginationItems: {...state.catalog.pagination},
  }));
  
  useEffect(() => {
    store.actions.catalog.load(select.pageNumber);
  }, [select.pageNumber]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена языка приложения
    changeLanguageTo: useCallback((lang) => store.actions.language.setLanguage(lang), [store]),
    // Смена страницы для пагинации
    setCurrentPage: useCallback((num) => store.actions.catalog.setPage(num), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} selectedLanguage={select.selectedLanguage} productLink={"/products/"}/>
    }, [callbacks.addToBasket, select.selectedLanguage]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' selectedLanguage={select.selectedLanguage} changeLanguageTo={callbacks.changeLanguageTo}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} selectedLanguage={select.selectedLanguage}/>
      <List list={select.list} renderItem={renders.item}/>
      <PaginationButtons paginationItems={select.paginationItems} setCurrentPage={callbacks.setCurrentPage}/>
    </PageLayout>

  );
}

export default memo(Main);
