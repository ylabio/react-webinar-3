import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.product.clear();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение страницы
    changePage: useCallback(page => store.actions.catalog.load(page), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        count={select.count}
        currentPage={select.currentPage}
        onPageChange={callbacks.changePage}
      />
    </>

  );
}

export default memo(Main);
