import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Header from '../header'
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams, useNavigate } from 'react-router';
import { useTranslate } from '../../hooks/useTranslate';
import Pagination from '../../components/pagination';
import Preloader from '../../components/preloader'

function Main() {

  const store = useStore();
  const tr = useTranslate()
  const navigate = useNavigate();

  const page = Number(useParams().page)

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [page]);

  const { lastPage, currentPage, list } = useSelector((state) => ({
    lastPage: state.catalog.pages.lastPage,
    currentPage: state.catalog.pages.currentPage,
    list: state.catalog.list
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    handlePaginationClick: (page) => () => {
      if (typeof page === 'number') {
        navigate(`/${page}`);
      }
    }
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} itemLink={`/product/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Header title={tr('Store')}/>
      {!list.length ? <Preloader/> : <List list={list} renderItem={renders.item}/>}
      <Pagination
        {...{lastPage, currentPage}} onPageClick={callbacks.handlePaginationClick}
      />
    </PageLayout>

  );
}

export default memo(Main);
