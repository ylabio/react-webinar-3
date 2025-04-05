import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import ListToggle from '../../components/list-toggle';
import ItemSumToggle from '../../components/item-sum-toggle';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    totalPages: state.catalog.totalPages,
    currentPage: state.catalog.currentPage,
    count: state.catalog.count,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Выбор количества показанных элементов списка
    onItemSumChange: useCallback((value) => store.actions.catalog.onItemSumChange(value), [store]),
    // Пагинация
    setCurrentPage: useCallback(_id => store.actions.catalog.setCurrentPage(_id), [store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
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
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <ItemSumToggle onItemSumChange={callbacks.onItemSumChange} />
      <ListToggle
        totalPages={select.totalPages}
        currentPage={select.currentPage}
        onPageChange={callbacks.setCurrentPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
