// import { memo, useCallback, useEffect, useState } from 'react';
// import Item from '../../components/item';
// import PageLayout from '../../components/page-layout';
// import Head from '../../components/head';
// import BasketTool from '../../components/basket-tool';
// import List from '../../components/list';
// import useStore from '../../store/use-store';
// import useSelector from '../../store/use-selector';
// import Pagination from '../../components/pagination/index';
//
//
// function Main() {
//   const store = useStore();
//   const [itemsPerPage, setItemsPerPage] = useState(10); // Количество элементов на странице
//   const [currentPage, setCurrentPage] = useState(1); // Текущая страница
//
//   useEffect(() => {
//     const skip = (currentPage - 1) * itemsPerPage;
//     const skip_v = Math.max(0, skip);
//     store.actions.catalog.load({ limit: itemsPerPage, skip:skip_v });
//   }, [currentPage, itemsPerPage, store]);
//
//   const select = useSelector(state => ({
//     list: state.catalog.list,
//     amount: state.basket.amount,
//     sum: state.basket.sum,
//     total: state.catalog.total || 0, // Общее количество элементов
//   }));
//
//   const callbacks = {
//     addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
//     openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
//     handlePageChange: useCallback((page) => {
//       setCurrentPage(page);
//     }, []),
//     handleItemsPerPageChange: useCallback((e) => {
//       setItemsPerPage(Number(e.target.value));
//       setCurrentPage(1); // Сброс на первую страницу при изменении количества элементов
//     }, []),
//   };
//
//   const renders = {
//     item: useCallback(
//       item => <Item item={item} onAdd={callbacks.addToBasket} />,
//       //
//       ////
//       [callbacks.addToBasket],
//     ),
//   };
//
//   const totalPages = Math.ceil(select.total / itemsPerPage); // Вычисление общего количества страниц
//
//   return (
//     <PageLayout>
//       <Head title="Магазин" />
//       <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
//
//       <div className="pagination-controls">
//         <div className="items-per-page">
//           <label htmlFor="items-per-page">Элементов на странице:</label>
//           <select
//             id="items-per-page"
//             value={itemsPerPage}
//             onChange={callbacks.handleItemsPerPageChange}
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="20">20</option>
//           </select>
//         </div>
//
//       </div>
//
//       <List list={select.list} renderItem={renders.item} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={callbacks.handlePageChange}
//         />
//     </PageLayout>
//   );
// }
//
// export default memo(Main);

import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination/index';

import './style.css';

function Main() {
  const store = useStore();
  const navigate = useNavigate(); // Добавляем хук useNavigate
  const [itemsPerPage, setItemsPerPage] = useState(10); // Количество элементов на странице
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;
    const skip_v = Math.max(0, skip);
    store.actions.catalog.load({ limit: itemsPerPage, skip:skip_v });
  }, [currentPage, itemsPerPage, store]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    total: state.catalog.total || 0, // Общее количество элементов
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    handlePageChange: useCallback((page) => {
      setCurrentPage(page);
    }, []),
    handleItemsPerPageChange: useCallback((e) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(1); // Сброс на первую страницу при изменении количества элементов
    }, []),
    navigateToItem: useCallback((id) => {
      navigate(`/items/${id}`);
    }, [navigate]),
  };

  const renders = {
    item: useCallback(
      item => <Item item={item} onAdd={callbacks.addToBasket} onClick={callbacks.navigateToItem} />,
      [callbacks.addToBasket, callbacks.navigateToItem],
    ),
  };

  const totalPages = Math.ceil(select.total / itemsPerPage);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />

      <div className="pagination-controls">
        <div className="items-per-page">
          <label htmlFor="items-per-page">Элементов на странице:</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={callbacks.handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={callbacks.handlePageChange}
      />
      </div>
    </PageLayout>

  );
}

export default memo(Main);
