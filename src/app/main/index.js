import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Pagination from '../../components/pagination';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    maxPages: state.pagination.maxPages,
    curPage: state.pagination.curPage,
    showItem: state.pagination.showItem,
  }));

  useEffect(() => {
    //если есть параметры то брать из них!!!!!
    store.actions.catalog.load(select.showItem, (select.curPage-1) * select.showItem);
    //store.actions.catalog.load(select.showItem);
    store.actions.pagination.setMaxPages(select.showItem);
  }, [select.showItem]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // 
    setPages: useCallback(
      page => {
        store.actions.catalog.load(select.showItem, (page - 1) * select.showItem);
        store.actions.pagination.setCurPage(page);
      },
      [store, select.showItem],
    ),
    // 
    setShowItem: useCallback(
      count => {
        store.actions.pagination.setCurPage(1);
        store.actions.pagination.setShowItem(count);
        store.actions.catalog.load(count, 0);
      },
      [store],
    ),
    // 
    loadAbout: useCallback(
      _id => {
        store.actions.product.loadAbout(_id);
      },
      [store],
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} onClickLoad={callbacks.loadAbout} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        curPage={select.curPage}
        maxPages={select.maxPages}
        setPages={callbacks.setPages}
        showItem={select.showItem}
        setShowItem={callbacks.setShowItem}
      />
    </PageLayout>
  );
}

export default memo(Main);
