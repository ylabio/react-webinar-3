import {memo, useCallback, useEffect, useState} from "react";
import { debounce } from "../../utils"; 
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Menu from '../../components/menu'
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Skeleton from "../../components/skeleton"; 
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useNavigate, useParams } from 'react-router-dom';
import '../../global.css';

function Main({ t }) {

  const store = useStore();
  const [isListLoading, setIsListLoading] = useState(true); 
  const navigate = useNavigate();
  const { pageNumber } = useParams(); 

  const defaultCurrentPage = 1;

  useEffect(() => {
    navigate(`/page/${+pageNumber || select.currentPage || defaultCurrentPage}`);
    store.actions.catalog.load(+pageNumber || select.currentPage || defaultCurrentPage).then(() => {
      setIsListLoading(false);
    });
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages    
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы
    onPageChange: useCallback(debounce(page => {
      navigate(`/page/${page}`); 
      setIsListLoading(true); 
      store.actions.catalog.load(page).then(() => {
        setIsListLoading(false);
      });
    }, 200), [store]) 
  };

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} t={t}/>
    }, [callbacks.addToBasket, t]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' t={t} />
        <div className="container">
          <Menu t={t} />
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} t={t}/>
        </div>
      {isListLoading ? <Skeleton /> : <List list={select.list} renderItem={renders.item} t={t}/>}
      <Pagination currentPage={select.currentPage} totalPages={select.totalPages} onPageChange={callbacks.onPageChange} />
    </PageLayout>

  );
}

export default memo(Main);
