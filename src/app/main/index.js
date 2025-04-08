import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useTranslation } from '../../hooks/useTranslation';
import Pagination from '../../components/pagination';
import { useNavigate } from 'react-router';

function Main() {
  const store = useStore();
  const [initLoad, setInitLoad] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const onMain = () => {
    navigate('/');
    callbacks.changePage(1);
  };

  useEffect(() => {
    if (initLoad) {
      store.actions.catalog.load();
      setInitLoad(false);
    }
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    error: state.catalog.error,
    isLoading: state.catalog.isLoading,
    totalItems: state.catalog.totalItems,
    currentPage: state.catalog.currentPage,
    limitItem: state.catalog.limitItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const totalPages = Math.ceil(select.totalItems / select.limitItem);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback(number => store.actions.catalog.changePage(number), [store]),
    changeLimitItem: useCallback(
      number => store.actions.catalog.changeLimitItem(number),
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

  if (select.error) return <div>Error occurred</div>;

  return (
    <PageLayout>
      <Head title="head" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        main="main"
        onMain={onMain}
      />
      {select.isLoading ? (
        <h2>{t('loading')}</h2>
      ) : (
        <List list={select.list} renderItem={renders.item} />
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={select.currentPage}
        onPageChange={callbacks.changePage}
        onLimitItem={callbacks.changeLimitItem}
      />
    </PageLayout>
  );
}

export default memo(Main);
