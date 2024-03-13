import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { paginationRange } from '../../utils';

function Main() {

  const store = useStore();
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    store.actions.catalog.load(currentPage);
  }, [currentPage]);

  // Элементы пагинации
  const paginateArray = store.actions.pagination.pageNums();
  const pages = paginationRange(paginateArray, currentPage);
  // Переход по страницам
  const paginate = page => setCurrentPage(page);

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
    // Информация о товаре
    infoProductPage: useCallback(_id => store.actions.product.info(_id), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} infoProduct={callbacks.infoProductPage}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination pages={pages} paginate={paginate} />
    </PageLayout>
  );
}

export default memo(Main);
