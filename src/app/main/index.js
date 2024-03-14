import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { useLocation, useNavigate } from 'react-router-dom';
import { languages } from '../../store/language/languages';

function Main() {

  const store = useStore();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.slice(1);
    store.actions.catalog.changeCurrentPage(+id || select.currentPage);
    store.actions.catalog.getTotalItems();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
    totalItems: state.catalog.totalItems,
    lang: state.language.language
  }));

  useEffect(() => {
    store.actions.catalog.load(select.limit, select.limit * select.currentPage - select.limit);
    navigate(`/${select.currentPage}`);
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение текущей страницы
    changeCurrentPage: useCallback(page => store.actions.catalog.changeCurrentPage(page), [store]),
    // Изменение языка
    changeCurrentLanguage: useCallback(() => store.actions.language.changeCurrentLanguage(), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} link={`/product/${item._id}`} onAdd={callbacks.addToBasket}
                    lang={select.lang}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  return (
    <PageLayout>
      <Head title={languages[select.lang].title} lang={select.lang} changeCurrentLanguage={callbacks.changeCurrentLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} lang={select.lang}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={select.currentPage} totalItems={select.totalItems}
      changeCurrentPage={callbacks.changeCurrentPage}/>
    </PageLayout>

  );
}

export default memo(Main);