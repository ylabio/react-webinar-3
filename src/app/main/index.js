import { memo, useCallback, useEffect, useState,useContext} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { LanguagesContext } from "../../components/languageSwitcher";
import MainMenu from "../../components/mainmenu";
import LoadingWrapper from "../../components/loading";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const {langData} = useContext(LanguagesContext);
  const store = useStore();
  // useEffect(() => {
  //   store.actions.catalog.fetchProducts();
  // }, []);
  useEffect(() => {
    store.actions.catalog.load();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    currentPosition:state.catalog.currentPosition,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),

    onChangePage: useCallback(
      (page) => store.actions.catalog.load(page),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} langData={langData} />;
      },
      [callbacks.addToBasket,langData]
    ),
  };

  return (
    
    <PageLayout>
        <LoadingWrapper isLoading={isLoading}>
      <Head title={langData.main.title} />
      <MainMenu langData={langData}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        langData={langData}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.currentPage}
        totalPages={select.totalPages}
        onPageChange={callbacks.onChangePage}
        currentPosition={select.currentPosition}
      />
      </LoadingWrapper>
    </PageLayout>
    
  );
}

export default memo(Main);
