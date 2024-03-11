import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();

  const [page, setPage] = useState(1)

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [page]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    handleSelectPage(pageNumber) {
      setPage(pageNumber)
    }
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        totalPages={select.totalPages}
        currentPage={page}
        handleSelectPage={callbacks.handleSelectPage}
        items={select.list.length}
      />
    </>
  );
}

export default memo(Main);
