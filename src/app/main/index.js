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
  const {id} = useParams()

  const select = useSelector(state => ({
    list: state.catalog.list,
  }));

  const {header} = useSelector(state =>state.locale.translations.main);

  useEffect(() => {
    const pageNum = id !== undefined ? id : "1";
    store.actions.catalog.loadCurrPage(pageNum);
  },[id,header]) // костыль

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout
      head={<Head title={header}/>}
       footer = {<Pagination/>}
    >
      <List list={select.list} renderItem={renders.item}/>
    </PageLayout>

  );
}

export default memo(Main);
