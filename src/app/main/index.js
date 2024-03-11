import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import LangSelect from "../../components/lang-select";

function Main() {

  const store = useStore();

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    store.actions.catalog.getCount()
  }, []);

  useEffect(() => {
    store.actions.catalog.load(currentPage);
  }, [currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    lang: state.lang.lang
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  return (
    <PageLayout>
      <div style={{position: "relative"}}>
        <Head title='Магазин' lang={select.lang}/>
        <LangSelect lang={select.lang} />
      </div>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} lang={select.lang}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} count={select.count} />
    </PageLayout>
  );
}

export default memo(Main);
