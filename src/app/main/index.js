import { memo, useCallback, useEffect, useContext } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination/pagination';
import { useParams } from 'react-router-dom';
import { LanguageContext } from '../../languages/languagesContext';
import Menu from '../../components/menu';
import Navigation from '../../components/navigation';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalProductCount: state.catalog.totalProductCount,
    pageSize: state.catalog.pageSize,
  }));

  let page = useParams().page

  useEffect(() => {
    store.actions.catalog.load(page);
  }, []);

  let { dict } = useContext(LanguageContext)

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы
    changePage: useCallback(page => store.actions.catalog.changePage(page), [store]),
    // Переход на главную
    toMain: useCallback(()=> store.actions.catalog.load(),[store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} link={`/product/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={dict.title} />
      <Menu>
        <Navigation toMain={callbacks.toMain}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
      </Menu>
      <List list={select.list} renderItem={renders.item} />
      <Pagination 
      currentPage={select.currentPage} totalProductCount={select.totalProductCount} 
      pageSize={select.pageSize} changePage={callbacks.changePage} 
      />
    </PageLayout>
  );
}

export default memo(Main);
