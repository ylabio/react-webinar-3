import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Pagination from '../../components/pagination';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import ItemsPerPage from '../../components/items-per-page';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    params: state.catalog.params,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onPageChange: useCallback(
      page => {
        const limit = select.params.limit;
        const skip = (page - 1) * limit;
        store.actions.catalog.load({ skip });
      },
      [store, select.params.limit],
    ),
    onItemsPerPageChange: useCallback(
      limit => {
        store.actions.catalog.load({ limit, skip: 0 });
      },
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

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const totalPages = Math.ceil(select.count / select.params.limit);
  const currentPage = Math.floor(select.params.skip / select.params.limit) + 1;

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.items} renderItem={renders.item} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <ItemsPerPage value={select.params.limit} onChange={callbacks.onItemsPerPageChange} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={callbacks.onPageChange}
        />
      </div>
    </PageLayout>
  );
}

export default memo(Main);
