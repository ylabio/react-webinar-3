import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Paging from "../../components/paging";

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    skip: state.paging.skip,
    limit: state.paging.limit,
    page: state.paging.page,
    avail: state.catalog.avail,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.catalog.avail();
    store.actions.catalog.load(select.skip, select.limit);
  }, [select.skip, select.limit]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // change page
    changePage: useCallback((page) => store.actions.paging.gotoPage(page), [store]),
    // setup limit
    setupLimit: useCallback((limit) => store.actions.paging.setLimit(limit), [store]),
  };

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Paging changePage={callbacks.changePage}
              setupLimit={callbacks.setupLimit}
              dataPaging={{page: select.page,
                          limit: select.limit,
                          avail: select.avail}}
            />
    </PageLayout>
  );
}

export default memo(Main);
