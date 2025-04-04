import { memo, useCallback, useEffect, useState } from 'react';
import './style.css'
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import NavBar from '../../components/nav-bar';

function Main() {
  const store = useStore();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const skip = (page - 1) * limit;
    store.actions.catalog.load({ limit, skip });
  }, [limit, page]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addToBasket(item), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };
  
  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={() => callbacks.addToBasket(item)} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout
      head={<Head title="Магазин" />}
    > 
      <div className='nav-container'>
        <NavBar onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </div>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        totalPages={Math.ceil(select.count / limit)}
        onChange={(newPage) => setPage(newPage)}
      />
    </PageLayout>
  );
}

export default memo(Main);
