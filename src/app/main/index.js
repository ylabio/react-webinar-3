import {memo, useCallback, useContext, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination"
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { LanguageContext } from '../../languageContext';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagination: state.pages
  }));

  const [language, setLanguage] = useContext(LanguageContext);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //Изменение страницы
    changePage: useCallback((page) => store.actions.pages.changePage(page), [store]),
    //Получение общего количества страниц
    getPagesQuantity: useCallback(() => store.actions.pages.getPagesQuantity(), [])
  }

  useEffect(() => {
    callbacks.getPagesQuantity();
  }, [])

  useEffect(() => {
    store.actions.catalog.load(select.pagination.currentPage)
  }, [select.pagination.currentPage])

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  const text = {
    ru: 'Магазин',
    eng: 'Shop'
  }

  return (
    <PageLayout>
      <Head title={text[language]}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} changePage={callbacks.changePage}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination pages={select.pagination} changePage={callbacks.changePage}/>
    </PageLayout>
  );
}

export default memo(Main);
