import { memo, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Item from "../../components/item";
import List from "../../components/list";
import PageSelect from "../../components/page-select";
import Loading from "../../components/loading";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  const { page } = useParams();

  useEffect(() => {
    store.actions.catalog.clearList();
    store.actions.catalog.fetchPage(parseInt(page));
  }, [page])

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pageLength: state.catalog.pageLength,
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
      return  <Item 
                 item={item} 
                 onAdd={callbacks.addToBasket} 
                 link={`/articles/${item._id}`}
              />
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <Loading isLoading={select.list === undefined}>      
        <List list={select.list} renderItem={renders.item}/>      
      </Loading>
      <PageSelect 
        currentPage={parseInt(page)} 
        pages={Math.ceil(select.count / select.pageLength)} 
      />
    </>
  );
}

export default memo(Main);
