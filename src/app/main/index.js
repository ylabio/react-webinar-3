import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import PaginationControls from '../../components/pagination-controls';
import Pagination from '../../components/pagination';
import ItemsPerPage from '../../components/items-per-page';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import useTranslation from '../../hooks/use-translation';
import { useSearchParams } from 'react-router-dom';

function Main() {
  const store = useStore();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

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
        setSearchParams({ page, limit });
        store.actions.catalog.load({ skip, limit });
      },
      [store, select.params.limit, setSearchParams],
    ),
    onItemsPerPageChange: useCallback(
      limit => {
        setSearchParams({ page: 1, limit });
        store.actions.catalog.load({ limit, skip: 0 });
      },
      [store, setSearchParams],
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
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    store.actions.catalog.load({ skip, limit });
  }, [searchParams, store]);

  const totalPages = Math.ceil(select.count / select.params.limit);
  const currentPage = Math.floor(select.params.skip / select.params.limit) + 1;

  const menuItems = [
    { label: t('mainPage'), link: '/' }
  ];

  return (
    <PageLayout>
      <Head title={t('shopTitle')} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        menuItems={menuItems}
      />
      <List list={select.items} renderItem={renders.item} />
      <PaginationControls>
        <ItemsPerPage value={select.params.limit} onChange={callbacks.onItemsPerPageChange} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={callbacks.onPageChange}
        />
      </PaginationControls>
    </PageLayout>
  );
}

export default memo(Main);
