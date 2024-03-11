import {useCallback, useContext, useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom'
import ArticlePage from './articlePage'
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <Routes>
      <Route path={'/'} element={
        <>
          <Main/>
          {activeModal === 'basket' && <Basket/>}
        </>
      } />
      <Route path={'/articles/:id'} element={<ArticlePage />} />
      {/*<Route path={'*'} element={<NotFound />} />*/}
    </Routes>

  );
}

export default App;
