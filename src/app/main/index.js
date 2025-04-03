import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import useTranslate from '../../hooks/use-translate';

// import catalog from '../../store/catalog';

function Main() {
  const store = useStore();
  const actions = store.actions;
  useEffect(() => {
    void store.actions.catalog.load();
  }, []);
  const { t } = useTranslate();
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    skip: state.catalog.skip,
    limit: state.catalog.limit,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => actions.basket.addToBasket(_id), [actions.basket]),
    // Открытие модального окна корзины
    openModalBasket: useCallback(() => actions.modals.open('basket'), [actions.modals]),
    setPage: useCallback(page => actions.catalog.setPage(page), [actions.catalog]),
    setLimit: useCallback(limit => actions.catalog.setLimit(limit), [actions.catalog]),
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
      <Head title={t('catalog')} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list || []} renderItem={renders.item} />
      <Pagination
        page={select.skip / select.limit + 1}
        limit={select.limit}
        onChange={callbacks.setPage}
        onChangeLimit={callbacks.setLimit}
      />
    </PageLayout>
  );
}

export default memo(Main);
