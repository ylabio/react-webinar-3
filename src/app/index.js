import { useCallback, useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import PageLayout from '../components/page-layout';
import Article from './article';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/article/:_id' element={<Article />} />
        {/* <Route
          path='404'
          element={<PageLayout/>}
        />
        <Route path='*' element={<Navigate to={'404'} />} /> */}
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
