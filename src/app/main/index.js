import { memo, useCallback, useEffect } from 'react';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import Item from '../../components/item';
import List from '../../components/list';
import PageLayout from '../../components/page-layout';
import Pagination from '../../components/pagination';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translations } from '../../utils/translations';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalItemsCount: state.catalog.totalItemsCount,
    pageSize: state.catalog.pageSize,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.currentLanguage,
  }));

  useEffect(() => {
    store.actions.catalog.getItemsCount();
  }, []);

  useEffect(() => {
    store.actions.catalog.getItems();
  }, [select.lang]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Пагинация
    onPageChange: useCallback(
      newPage => {
        store.actions.catalog.getItems({
          currentPage: newPage,
          pageSize: select.pageSize,
        });
      },
      [store, select.pageSize, select.lang],
    ),
    // Изменение количества товаров на странице
    onPageSizeChange: useCallback(
      newPageSize => {
        store.actions.catalog.changePageSize(newPageSize);
        store.actions.catalog.getItems({
          currentPage: 1,
          pageSize: newPageSize,
        });
      },
      [store, select.pageSize, select.lang],
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  const t = translations[select.lang] || translations.ru;

  return (
    <PageLayout>
      <Head title={t.headTitle} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.currentPage}
        totalItemsCount={select.totalItemsCount}
        onPageChange={callbacks.onPageChange}
        onPageSizeChange={callbacks.onPageSizeChange}
        pageSize={select.pageSize}
      />
    </PageLayout>
  );
}

export default memo(Main);
