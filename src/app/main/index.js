import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/paginaton";
import {useLanguage} from "../../hooks";
import Navigation from "../../components/navigation";
import HeaderLayout from "../../components/header-layout";

const PAGE_SIZE = 10;

function Main() {
  const {t} = useLanguage()

  const [currentPage, setCurrentPage] = useState(1);

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    total: state.catalog.total,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} redirectTo={`/product/${item._id}`} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  function onChangePage(number) {
    setCurrentPage(number)
  }

  useEffect(() => {
    store.actions.catalog.load(PAGE_SIZE, currentPage);
  }, [currentPage]);

  return (
    <PageLayout>
      <Head title={t("Shop")}/>
      <HeaderLayout>
        <Navigation/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </HeaderLayout>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination total={select.total} limit={PAGE_SIZE} currentPage={currentPage} onChangePage={onChangePage}/>
    </PageLayout>
  );
}

export default memo(Main);
