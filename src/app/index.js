import React, {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import ProductPage from "../components/product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>} />
        <Route path={'/item/:itemId'} element={<ProductPage/>} />
      </Routes>
        {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
