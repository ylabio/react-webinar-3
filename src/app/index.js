import { useCallback, useContext, useEffect, useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import ProductPage from './product-page';
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Route, Routes } from 'react-router-dom';
import Store from '../store';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const catalog = useSelector(state => state.catalog);

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Main />
          {activeModal === 'basket' && <Basket />}
        </>
      } />
      {catalog.list.map(item => <Route key={item.id} path={`/product/${item.code}`} element={<ProductPage />} />)}
    </Routes>
  );
}

export default App;
