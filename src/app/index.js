import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import Detail from "./detail";
import {Routes, Route, useLocation} from 'react-router-dom'
import Head from "../components/head";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);


  return (
    <>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/detail/:itemId' element={<Detail />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
