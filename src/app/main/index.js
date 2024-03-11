import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useLanguage } from "../../language";

function Main() {

  const store = useStore();

  const { currentLanguage } = useLanguage()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetch('/api/v1/articles?fields=items(_id), count')
      .then(res => res.json())
      .then(data => setTotalPages(Math.ceil(data.result.count / 10)))
  }, [])

  function nextPage(num, shift) {
    if (currentPage === totalPages) return
    setCurrentPage(prevValue => prevValue + 1 + num)
    setOffset(prevValue => prevValue + 10 * shift)
  }

  function firstPage() {
    setCurrentPage(1)
    setOffset(0)
  }

  function lastPage() {
    setCurrentPage(totalPages)
    setOffset((totalPages - 1) * 10)
  }

  function prevPage() {
    if (currentPage === 1) return
    setCurrentPage(prevValue => prevValue - 1)
    setOffset(prevValue => prevValue -10)
  }

  useEffect(() => {
    store.actions.catalog.load(offset);
  }, [currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
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
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={currentLanguage === 'ru' ? 'Магазин' : 'Shop'}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination firstPage={firstPage} lastPage={lastPage} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} totalPages={totalPages} />
    </PageLayout>
  );
}

export default memo(Main);
