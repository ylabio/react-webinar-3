import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import AboutProduct from './aboutProduct';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              {activeModal === 'basket' && <Basket />}
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <AboutProduct />
              {activeModal === 'basket' && <Basket />}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
