import { useCallback, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Main from './main';
import Basket from './basket';
import Product from './product';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';

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
                <Route path='/' element={<Main />} />
                <Route path='/:id' element={<Product />} />
            </Routes>
            {activeModal === 'basket' && <Basket />}
        </BrowserRouter>
    </>
  );
}

export default App;
