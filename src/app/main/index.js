import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { translate } from '../../utils';

function Main() {
  const store = useStore();
  const select = useSelector(state => ({
    totalItem: state.catalog.totalItem,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPage: state.catalog.totalPage,
    page: state.catalog.page,
    limit: state.catalog.limit,
    lang: state.language.language,
  }));
  const translation = translate[select.lang];
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Выбор страницы
    pageChange: useCallback(
      newPage => {
        store.actions.catalog.load({
          page: newPage,
          limit: select.limit,
        });
      },
      [store, select.limit],
    ),
    limitChange: useCallback(
      newLimit => {
        store.actions.catalog.changeLimit(newLimit);
        store.actions.catalog.load({
          page: 1,
          limit: newLimit,
        });
      },
      [store, select.limit],
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
  useEffect(() => {
    store.actions.catalog.loadTotalItemCount();
    store.actions.catalog.load();
  }, []);

  return (
    <PageLayout>
      <Head title={translation.headTitle} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalItem={select.totalItem}
        totalPage={select.totalPage}
        page={select.page}
        limit={select.limit}
        siblings={1}
        pageChange={callbacks.pageChange}
        limitChange={callbacks.limitChange}
      ></Pagination>
    </PageLayout>
  );
}

export default memo(Main);
