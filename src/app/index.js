import { useCallback, useContext, useEffect, useState } from 'react';
import Main from "./main";
import Article from './article';
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocaleProvider } from '../store/locale-context';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <LocaleProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Main />} />
            <Route path='/product' element={<Article />} />
          </Routes>
          {activeModal === 'basket' && <Basket />}
        </BrowserRouter>
      </LocaleProvider>
    </>
  );
}

export default App;
