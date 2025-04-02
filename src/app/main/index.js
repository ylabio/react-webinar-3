import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Footer from '../../components/footer';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';

function Main(callback, deps) {
  const store = useStore();

  console.log(store.state.catalog);

  useEffect(() => {
    store.actions.catalog.load();
    setTimeout(() => {
      store.actions.catalog.updateProductData();
    }, 1000);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    viewPage: useCallback((limit, page, lang) =>
      store.actions.catalog.updateProductData(limit, page, lang), [store],
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

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Footer>
        <Pagination onOpenPage={callbacks.viewPage} />
      </Footer>
    </PageLayout>
  );
}

export default memo(Main);
