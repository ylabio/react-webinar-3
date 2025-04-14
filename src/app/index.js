import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';
import ProtectedRoute from '../components/protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categoryList: state.catalog.categoryList,
  }));

  useEffect(() => {
    store.actions.authorization.checkUser();
    document.title = 'Магазин';
  }, []);

  useEffect(() => {
    const categoryTitle = select.categoryList.find(item => item.value === select.category)?.title;
    document.title = `Магазин${select.category ? ' / ' + categoryTitle : ''}`;
  }, [select.category]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<ProtectedRoute anonymous={true}><Login /></ProtectedRoute>} />
        <Route path={'/profile'} element={<ProtectedRoute anonymous={false}><Profile /></ProtectedRoute>} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
