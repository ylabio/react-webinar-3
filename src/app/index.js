import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Details from './details';
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Routes, Route } from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='details/:id/:currentPage' element={<Details />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
