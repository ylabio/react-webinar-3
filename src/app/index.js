import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import Article from './article';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import routes from '../routes';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={routes.mainPagePath} element={<Main />} />
        <Route path={'/product/:id'} element={<Article  />}/>
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
