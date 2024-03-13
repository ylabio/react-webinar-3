import {memo, useCallback, useEffect, useMemo} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useLocation, useParams } from 'react-router';

function Main() {

  const store = useStore();
  const {id} = useParams();
  const pageNum = id || "1"

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages : state.catalog.totalPages,
    paginationArray : state.catalog.paginationArray,
  }));
  
  const locale = useSelector(state =>state.locale);

  useEffect(() => {
    store.actions.catalog.loadCurrPage(pageNum);
  },[pageNum,locale])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} link = {`/product/${item._id}`} locale = {locale.translations.main}/>
    }, [callbacks.addToBasket,locale]),
  };

  return (
    <PageLayout
      head={<Head title={locale.translations.main.header}/>}
       footer = {<Pagination paginationArray = {select.paginationArray} currPage = {pageNum}/>}
    >
      <List list={select.list} renderItem={renders.item}/>
    </PageLayout >

  );
}

export default memo(Main);
