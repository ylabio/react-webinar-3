import { memo, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router";
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { generatePaginatedApiUrl, findNewPageNumber } from '../../utils';
import { BASE_URL, STRINGS } from '../../const';

function Main() {
  const store = useStore();
  const { currentPage } = useParams();
  const language = useSelector(state => state.catalog.language);
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.catalog.setPage(currentPage);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading: state.catalog.isLoading,
    currentPage: state.catalog.currentPage,
    limit: state.catalog.limit,
    maxPage: Math.ceil(state.catalog.count / state.catalog.limit),
  }));

  useEffect(() => {
    if (select.currentPage > 0) {
      store.actions.catalog.load(generatePaginatedApiUrl(BASE_URL, select.currentPage, select.limit));
    }
  }, [select.currentPage]);

  useEffect(() => {
    if (select.currentPage > 0 && +select.currentPage === 1) {
      store.actions.catalog.load(generatePaginatedApiUrl(BASE_URL, select.currentPage, select.limit));
    }
  }, [select.limit]);

  useEffect(() => {
    if (select.list.length === 0 && select.count > 0) {
      navigate(`/page/${select.maxPage}`);
    }
  }, [select]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Изменение языка
    onChangeLanguage: useCallback(() => store.actions.catalog.changeLanguage(), [store]),
    // Открытие модалки
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Выбор количества отображаемых элементов на странице
    setLimit: useCallback((newLimit) => {
      const newPage = findNewPageNumber(select.currentPage, select.limit, newLimit);
      store.actions.catalog.setLimit(newLimit);
      store.actions.catalog.setPage(newPage);
      navigate(`/page/${newPage}`);
    }, [select.limit, select.currentPage, navigate]),
    // Изменение номера страници
    setPage: useCallback(page => store.actions.catalog.setPage(page), [store]),
  };

  const texts = {
    addButtonText: STRINGS.ADD[language],
    title: STRINGS.SHOP[language],
    switchLanguage: STRINGS.SWITCH_LANGUAGE[language],
    home: STRINGS.HOME[language],
    empty: STRINGS.EMPTY[language],
    products: STRINGS.PRODUCTS[language],
    select: STRINGS.SELECT[language],
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} texts={texts}/>;
      },
      [callbacks.addToBasket, texts],
    ),
  };

  return (
    <PageLayout>
      <Head
        title={texts.title}
        changeLanguage={callbacks.onChangeLanguage}
        switchLanguage={texts.switchLanguage}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        home={texts.home}
        empty={texts.empty}
        products={texts.products}
        language={language}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.currentPage}
        maxPage={select.maxPage}
        limit={select.limit}
        changeLimit={callbacks.setLimit}
        texts={texts.select}
        setPage={callbacks.setPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
