import { useCallback, useContext, useEffect, useState } from 'react';
import Main from "./main";
import Article from './article';
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
          <Route index element={<Main />} />
          <Route path='/product' element={<Article />} />
        </Routes>
        {activeModal === 'basket' && <Basket />}
      </BrowserRouter>
    </>
  );
}

export default App;
