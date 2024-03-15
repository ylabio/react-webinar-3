import {useCallback, useContext, useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Goods from "./goods"
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/goods">
          <Route path="/goods/:id" element={<Goods/>}/>
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default App;
