import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Header from '../../components/header'
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router';
import Pagination from '../../components/pagination';

function Main() {

  const store = useStore();

  const page = Number(useParams().page)

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [page]);

  const list = useSelector(state => state.catalog.list);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Header title={'Магазин'}/>
      <List list={list} renderItem={renders.item}/>
      <Pagination/>
    </PageLayout>

  );
}

export default memo(Main);
