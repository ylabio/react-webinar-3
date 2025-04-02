import { useCallback, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Main from './main';
import Basket from './basket';
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
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" replace />} />
        <Route path="/page/:currentPage" element={
          <>
            <Main />
            {activeModal === 'basket' && <Basket />}
          </>
        } />
      </Routes>
    </>
  );
}

export default App;