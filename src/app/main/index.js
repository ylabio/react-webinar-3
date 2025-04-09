import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Nav from '../../components/nav';
import { useTranslation } from '../../translation/TranslationContext';

function Main() {
  const store = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    limit: state.catalog.limit,
    page: state.catalog.page,
    maxCount: state.catalog.maxCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы
    setPage: useCallback(page => store.actions.catalog.setPage(page), [store]),
    // Изменение лимита
    setLimit: useCallback(limit => store.actions.catalog.setLimit(limit), [store]),
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
      <Head title={t('mainTitle')} />
      <Nav>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </Nav>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        limit={select.limit}
        page={select.page}
        maxCount={select.maxCount}
        setPage={callbacks.setPage}
        setLimit={callbacks.setLimit}
      />
    </PageLayout>
  );
}

export default memo(Main);
