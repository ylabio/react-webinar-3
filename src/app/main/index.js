import {memo, useCallback,useState, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import {useNavigate} from "react-router-dom";

function Main() {

  const store = useStore();
  const [item, setItem] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.catalog.load(item);
  }, [item]);

  useEffect(() => {
    store.actions.catalog.getLimit();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    limit: state.catalog.limit,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    getPage: useCallback((page) => store.actions.catalog.getPage(page), [store]),
    navToPage:  useCallback(_id => navigate(`detail/${_id}`), [store]),

  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} navToPage={callbacks.navToPage} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination onClick={(count) => setItem(count)} id={item} limit={select.limit}/>
    </PageLayout>
  );
}

export default memo(Main);
