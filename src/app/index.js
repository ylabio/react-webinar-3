import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Card from './card';

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

          <Route exact path="/" element={<Main/>} />

          <Route exact path={"/card/:id" } element={ <Card /> } />
       
        </Routes>
    

        {/* <Main/> */}
        {activeModal === 'basket' && <Basket/>}
      </BrowserRouter>
    </>
  );
}

export default App;
