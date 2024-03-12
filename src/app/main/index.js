import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useParams } from 'react-router-dom';

function Main() {

  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    const pageNum = id !== undefined ? id : "1";
    store.actions.catalog.loadCurrPage(pageNum);
  }, [id]);

  const select = useSelector(state => ({
    list: state.catalog.list,
  }));

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
      head={<Head title='Магазин'/>}
      footer = {<Pagination/>}
    >
      <List list={select.list} renderItem={renders.item}/>
    </PageLayout>
  );
}

export default memo(Main);
