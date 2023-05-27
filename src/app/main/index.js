import React, {memo, useState, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

function Main(props) {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
    limitPage: state.catalog.limitPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} setIdProduct={props.setIdProduct}
                   lang={props.lang}/>
    }, [callbacks.addToBasket, props.lang]),
  };
  
  // Вычисляем количество страниц
  const calculateNumberPages = Math.ceil(select.limit > (select.count - select.skip) ?
    ((select.count - select.skip) / select.limitPage) : (select.limit / select.limitPage));
  const pageCount = isNaN(calculateNumberPages) ? 0 : calculateNumberPages;
  
  // Номер активной страницы
  const [activePage, setActivePage] = useState(1);
  
  // Выводим товар на страницу
  const showList = select.list.slice([(activePage - 1) * select.limitPage], [activePage * select.limitPage]);
  
  return (
    <PageLayout>
      <Head title={props.lang.header} setLang={props.setLang}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} lang={props.lang}/>
      <List list={showList} renderItem={renders.item}
            setLang={props.setLang} />
      <Pagination pageCount={pageCount} activePage={activePage}
                  setActivePage={setActivePage}/>
    </PageLayout>

  );
}

export default memo(Main);
