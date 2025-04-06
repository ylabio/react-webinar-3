import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import Article from './article';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>

        {activeModal === 'basket' && <Basket />}
      </BrowserRouter>
    </>
  );
}

export default App;
