import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Nav from '../../components/nav';
import { useLanguage } from '../../store/language-context';

function Main() {
  const store = useStore();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const skip = (page - 1) * limit;

  useEffect(() => {
    store.actions.catalog.load(limit, skip);
  }, [page, store, limit]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
  }));

  const callbacks = {
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

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleLimitChange = newLimit => {
    setLimit(newLimit);
    setPage(1);
  };

  const { translate } = useLanguage();

  return (
    <PageLayout>
      <Head title={translate('shop')} />
      <Nav title={translate('main')} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        page={page}
        totalPages={select.totalPages}
        limit={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
