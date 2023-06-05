import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Auth from './auth';
import Profile from './profile';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  const activeModal = useSelector((state) => state.modals.name);

  useEffect(() => {
    store.actions.profile.loginByToken();

    const fetchCategories = async () => {
      await store.actions.categories.getCategories();
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Auth />} />
        <Route path={'/profile/:id'} element={<Profile />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
