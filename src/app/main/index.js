import { memo, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Item from "../../components/item";
import List from "../../components/list";
import PageSelect from "../../components/page-select";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  const { id } = useParams();

  useEffect(() => {
    id && store.actions.catalog.fetchPage(parseInt(id));
  }, [id]);

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pageLength: state.catalog.pageLength,
    page: state.catalog.page,
    count: state.catalog.count,
  }));

  const location = useLocation();
  const navigate = useNavigate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    // openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.item}/>
      <PageSelect 
        currentPage={select.page} 
        pages={Math.ceil(select.count / select.pageLength)} 
      />
    </>
  );
}

export default memo(Main);
