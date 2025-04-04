import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import locales from '../../locales';


function Main() {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const skip = (currentPage - 1) * limit;
  
  useEffect(() => {
    console.log('load')
    store.actions.catalog.loadFields();
  }, []);

  useEffect(() => {
    console.log('slice')
    store.actions.catalog.loadParams({skip, limit});
  }, [currentPage, limit]);
  
  const select = useSelector(state => ({
    list: state.catalog.list,
    totalItems: state.catalog.total,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.lang.language,
  }));
  let countPage = Math.ceil(select.totalItems / limit)
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket}/>;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={locales[select.language].market} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination 
      language={select.language}
      limit={limit}
      setLimit={setLimit}
      setCurrentPage={setCurrentPage} 
      countPage={countPage} 
      currentPage={currentPage} />
    </PageLayout>
  );
}

export default memo(Main);
