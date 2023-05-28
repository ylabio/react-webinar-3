import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ContainerSpaceBetween from '../../components/container-space-between';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Nav from '../../components/nav';
import Pagination from '../../components/pagination';
import Lang from '../../components/lang';
import useTranslate from '../../store/use-translate';

function Main() {
  const t = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    pagesCount: state.catalog.pagesCount,
    activePage: state.catalog.activePage,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.activePage);
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
    changePage: useCallback(
      (activePage) => store.actions.catalog.changePage(activePage),
      [store]
    ),
    changeLang: useCallback(
      (lang) => store.actions.lang.changeLang(lang),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title={t('store')} />
      <ContainerSpaceBetween>
        <Nav />
        <Lang onChangeLang={callbacks.changeLang} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </ContainerSpaceBetween>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        onChangePage={callbacks.changePage}
        pagesCount={select.pagesCount}
        activePage={select.activePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
