import { memo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import MainMenu from '../../components/main-menu';
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLanguage } from "../../store/language-context";

function Main() {

  const store = useStore();
  const {Language, translations} = useLanguage();

  useEffect(() => {
    store.actions.catalog.load(1);
  }, []);

  const select = useSelector(state => ({
    count: state.catalog.count,
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    onPageChange: useCallback(currentPage => store.actions.catalog.load(currentPage), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} link={`/card/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={translations['store']}/>
      <MainMenu>
        <Link to="/">{translations['mainPage']}</Link>
        <BasketTool 
          onOpen={callbacks.openModalBasket} 
          amount={select.amount}
          sum={select.sum}/>
      </MainMenu>
      <List list={select.list} renderItem={renders.item}/>

      <Pagination 
        currentPage={select.currentPage} 
        totalItems={select.count} 
        onPageChange={callbacks.onPageChange} 
      />

    </PageLayout>

  );
}

export default memo(Main);
