import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Product from './product';
import Basket from "./basket";
import {Routes, Route} from "react-router-dom";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/:page" element={<Main/>} />
        <Route path="/product/:productId" element={<Product />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
