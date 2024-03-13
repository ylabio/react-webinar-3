import { memo, useCallback, useEffect } from 'react'
import Header from '../../components/header'
import Item from "../../components/item";
import Navigation from '../../components/navigation'
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination'
import { useTranslate } from '../../hooks/useTranslate'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
    language: state.language.value
  }));

  useEffect(() => {
    store.actions.catalog.load((select.currentPage - 1) * 10, select.language);
  }, [select.language, select.currentPage]);

  useTranslate([select.list], select.language);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы
    changeCurrenPage: useCallback(page => store.actions.catalog.changePage(page), [store]),
    // Смена языка
    changeLanguage: useCallback(lang => store.actions.language.changeLang(lang), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`}/>
    }, [callbacks.addToBasket, callbacks.changeLanguage, callbacks.changeCurrenPage]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' lang={select.language} changeLang={callbacks.changeLanguage}/>
      <Header>
        <Navigation link={'/'} title={'Главная'} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} lang={select.language}/>
      </Header>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination countPages={select.count} currentPage={select.currentPage} onChangePage={callbacks.changeCurrenPage} />
    </PageLayout>

  );
}

export default memo(Main);
