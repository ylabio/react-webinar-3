import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useTranslation } from '../../translation/use-translation';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    total: state.catalog.total,
    currentPage: state.catalog.currentPage,
    itemsPerPage: state.catalog.itemsPerPage,
    itemsPerPageOptions: state.catalog.itemsPerPageOptions,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы
    onPageChange: useCallback(page => store.actions.catalog.setPage(page), [store]),
    // Изменение количества элементов на странице
    onItemsPerPageChange: useCallback(
      value => store.actions.catalog.setItemsPerPage(value),
      [store],
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

  const { t } = useTranslation();

  return (
    <PageLayout
      head={<Head title={t('shop')} />}
      footer={
        <Pagination
          total={select.total}
          currentPage={select.currentPage}
          itemsPerPage={select.itemsPerPage}
          itemsPerPageOptions={select.itemsPerPageOptions}
          onPageChange={callbacks.onPageChange}
          onItemsPerPageChange={callbacks.onItemsPerPageChange}
        />
      }
    >
      <BasketTool onOpen={callbacks.openBasket} sum={select.sum} amount={select.amount} />
      <List list={select.list} renderItem={renders.item} />
    </PageLayout>
  );
}

export default memo(Main);
