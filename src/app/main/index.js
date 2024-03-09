import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import MainMenu from '../../components/main-menu';
import MainNav from '../../components/main-nav';
import Pagination from '../../components/pagination';
import { useNavigate, useParams } from 'react-router-dom';

function Main() {


  const store = useStore();
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    maxPage: state.catalog.pagination.max,
    currentPage: state.catalog.pagination.current,
  }));

  const rawPage = useParams().page
  const navigate = useNavigate();

  useEffect(() => {
    const page = parseInt(rawPage);
    const normalizedPage = page ? page : 1;
    console.log(normalizedPage)
    if(normalizedPage !== page) {
      navigate('/' + normalizedPage);
    } else {
      store.actions.catalog.load(normalizedPage);
    }
  }, [rawPage]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <MainMenu>
        <MainNav />
        <BasketTool />
      </MainMenu>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination max={select.maxPage} current={select.currentPage} />
    </PageLayout>

  );
}

export default memo(Main);
