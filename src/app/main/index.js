import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
    allPages: state.catalog.allPages,
    limit: state.catalog.limit,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.page);
  }, [select.page, select.limit]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    turnPage: useCallback((e) => {
      const pageNum = parseInt(e.target.id);
      store.actions.catalog.turnPage(pageNum);
    }, 
    []),
    setLimit: useCallback((e) => {
      const limitNum = parseInt(e.target.id);
      store.actions.catalog.setLimit(limitNum);
    }, 
    []),
  };

  const emptyPages = [];

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
    page: useCallback(
      page => {
        if (page === select.allPages[0] ||
          page === select.allPages[select.allPages.length - 1] ||
          page >= select.page - 1 && page <= select.page + 1
        ) {
          emptyPages.push(1);
          return <li 
            key={page} 
            id={page}
            className={page === select.page ? "Page-active" : "Page"}
            onClick={callbacks.turnPage}>
              {page}
            </li>
        } else if (emptyPages[page - 2] === 0) {
          emptyPages.push(0);
        } else {
          emptyPages.push(0);
          return <li key={page}>{'...'}</li>
        }
      },
      [select.allPages, select.page]
    ),
    limit: useCallback(
      limit => {
        return <li 
          id={limit}
          key={limit}
          className={limit === select.limit ? "Skip-active" : "Skip"}
          onClick={callbacks.setLimit}>
            {limit}
          </li>;
      },
      [select.limit]
    )
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination renderPage={renders.page} renderLimit={renders.limit}/>
    </PageLayout>
  );
}

export default memo(Main);
