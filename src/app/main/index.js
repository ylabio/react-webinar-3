import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../pagination';
import ListProducts from '../../components/listProducts';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { Route, Routes, useLocation } from 'react-router-dom';
import Product from '../../pages/product';
import NotFoundPage from '../../pages/not-found-page';

function Main() {

  const store = useStore()

  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1)
  const listPerPage = 10

  useEffect(() => {
    store.actions.catalog.load(currentPage, listPerPage);
  }, [currentPage, listPerPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
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

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <PageLayout>
      <Head title={location.pathname === "/" ? "Магазин" : "Название товара"} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ListProducts>
              <List list={select.list} renderItem={renders.item} />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(select.count / listPerPage)}
                onPageChange={handlePageChange}/>
            </ListProducts>
          }
        />
        <Route path="/:id" element={<Product onAdd={callbacks.addToBasket}/>} />
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
