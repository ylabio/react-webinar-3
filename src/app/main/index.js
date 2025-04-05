import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination/pagination';
import Basket from '../basket';
import LanguageSwitcher from '../../components/language-switcher';
import { useTranslate } from '../../locales/use-translate';


function Main() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const t = useTranslate();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    limit: state.catalog.limit,
    page: state.catalog.page,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Установка страницы и количества товаров на странице
    handlePaginationChange: useCallback(({ page, limit }) => {
      if (page !== select.page) store.actions.catalog.setPage(page);
      if (limit !== select.limit) store.actions.catalog.setLimit(limit);
    }, [store, select.page, select.limit]),
    // Выбор языка
    handleLanguageChange: useCallback((lang) => store.actions.locale.setLang(lang), [store])
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout head={<LanguageSwitcher language={select.lang} onChange={callbacks.handleLanguageChange} />}>
      <Head title={t.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalPages={select.totalPages}
        limit={select.limit}
        page={select.page}
        onChange={callbacks.handlePaginationChange}
      />
      {activeModal === 'basket' && <Basket />}
    </PageLayout>
  );
}

export default memo(Main);
