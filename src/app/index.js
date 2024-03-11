import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router';
import ItemPage from './itemPage/itemPage';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/items/:itemId" element={<ItemPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {activeModal === 'basket' && <Basket />}
      </>
  );
}

export default App;
