import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { Link } from 'react-router-dom';

function Main() {
  const store = useStore();

  // Загружаем каталог при монтировании и при изменении параметров
  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count, // Добавляем общее количество
    page: state.catalog.page, // Текущая страница
    limit: state.catalog.limit, // Лимит на странице
    waiting: state.catalog.waiting, // Флаг загрузки
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы
    changePage: useCallback(page => store.actions.catalog.setPage(page), [store]),
    // Изменение лимита
    changeLimit: useCallback(limit => store.actions.catalog.setLimit(limit), [store]),
  };

  const renders = {
    item: useCallback(
      item => <Item item={item} onAdd={callbacks.addToBasket} link="/product" />,
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />

      {select.waiting && <div className="loader">Загрузка...</div>}

      <List list={select.list} renderItem={renders.item} />

      {select.count > 0 && (
        <Pagination
          totalItems={select.count}
          itemsPerPage={select.limit}
          currentPage={select.page}
          onPageChange={callbacks.changePage}
          onItemsPerPageChange={callbacks.changeLimit}
        />
      )}
    </PageLayout>
  );
}

export default memo(Main);
