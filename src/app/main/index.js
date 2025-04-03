import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import useTranslate from '../../hooks/useTranslate';

function Main() {
  const store = useStore();
  const t = useTranslate();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    count: state.catalog.count,    
    pageSize: state.catalog.pageSize, 
    availableSizes: state.catalog.availableSizes
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение текущей странички
    setPage: useCallback(page => store.actions.catalog.setPage(page), [store]),
    setPageSize: useCallback(size => store.actions.catalog.setPageSize(size), [store]),
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
      <Head title={t('shop')} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      {select.count > 0 && ( //показ только при наличии товаров
        <Pagination
          currentPage={select.currentPage}
          totalPages={Math.ceil(select.count / select.pageSize)} //общее число страничек
          onPageChange={callbacks.setPage}
          pageSize={select.pageSize}
          onPageSizeChange={callbacks.setPageSize}
          availableSizes={select.availableSizes}
        />
      )}
    </PageLayout>
  );
}

export default memo(Main);
