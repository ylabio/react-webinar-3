import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { messages } from '../../messages';

function Main({children}) {
  const store = useStore();
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.inter.lang,
    page: state.catalog.page,
    limit: state.catalog.limit,
    totalPages: state.catalog.totalPages
  }));

  const headerMessage= messages[select.lang].header;

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    changeLimit: useCallback((limit)=>store.actions.catalog.setParams(undefined,limit),[store]),

    changePage:  useCallback((page)=>  store.actions.catalog.setParams(page),[store]),
    
    load: useCallback(()=> store.actions.catalog.load(), [store]),

    loadCount : useCallback(()=> store.actions.catalog.loadCount(),[store])
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
    <>
      <Head title={headerMessage} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination loadCount={callbacks.loadCount} load={callbacks.load} changeLimit={callbacks.changeLimit} changePage={callbacks.changePage} page={select.page} limit={select.limit}  totalPages={select.totalPages}/>
      {children}
    </>
  );
}

export default memo(Main);
