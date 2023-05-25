import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import BasketTool from "../../components/basket/basket-tool";
import HorizontalContainer from "../../components/container/horizontal";
import Head from "../../components/head";
import Item from "../../components/items/item";
import Language from "../../components/lang-selector";
import PageLayout from "../../components/layouts/page-layout";
import List from "../../components/list";
import Menu from "../../components/menu";
import Paginator from '../../components/paginator';
import useLanguage from '../../localization/use-language';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Main() {

  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    loading: state.catalog.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.localization.lang
  }));

  const ln = useLanguage();

  useEffect(() => {
    //store.actions.catalog.load();
    store.actions.catalog.loadPage(select.page.current);
  }, [select.page.current, select.page.limit])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключаем страничку
    switchPage: useCallback(selected => {
      if (select.loading)
        return;
      store.actions.catalog.setCurrentPage(selected);
    }, [select.loading]),
    // Подробности о товаре
    showArticle: useCallback(id => navigate(`article/${id}`), []),
    // Переключение языка
    switchLanguage: useCallback(ln => store.actions.localization.setLanguage(ln), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} onTitleClick={callbacks.showArticle}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Language id={select.lang} onSelect={callbacks.switchLanguage}/>
      <Head title={ln('mainLabel')} />
      <HorizontalContainer justifyContent='space-between'>
        <Menu/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </HorizontalContainer>
      <List list={select.list} renderItem={renders.item} />
      <Paginator total={select.page.total} current={select.page.current} onClick={callbacks.switchPage} />
    </PageLayout>
  );
}

export default memo(Main);
